const { green, cyan, red, bold, magenta, white } = require('chalk');
const path = require('path');
const fse = require('fs-extra');
const createPackages = require('./create-packages');
const build = require('./transpile');
const { buildTypes, copyTypes } = require('./build-types');

const typesRelativeDir = './types';
let hasError = false;

const step = (name, fn) => async () => {
  console.log(cyan('Building: ') + green(name));
  await fn();
  console.log(cyan('Built: ') + green(name));
};

const clean = step('Cleaning...', async () => {
  try {
    const typesDir = path.resolve(typesRelativeDir);
    if (!(await fse.pathExists(typesDir))) {
      return;
    }
    await fse.remove(typesDir);
  } catch (error) {
    throw new Error('Could not clean');
  }
});

const buildESM = step('ECMA script modules (ESM)', async () => {
  await build('esm');
  await copyTypes(typesRelativeDir, 'esm');
});

const buildCJS = step('commonjs (CJS)', async () => {
  await build('cjs');
  await copyTypes(typesRelativeDir, 'cjs');
});

const buildTSTypes = step('Building types (.d.ts)', async () => {
  await buildTypes(typesRelativeDir);
});

const linkDirectories = step('Linking directories', async () => {
  await createPackages();
});

const getPackageName = () => {
  return path.basename(path.resolve(process.cwd()));
};

console.log(green(`Building package: ${white(getPackageName())}\n`));

async function run() {
  try {
    await buildTSTypes();
    await Promise.all([buildESM(), buildCJS()]);
    await linkDirectories();
  } catch (err) {
    if (err) {
      console.error(red(err.stack));
      console.error(red(err.toString()));
    }
    hasError = true;
  } finally {
    await clean();
    if (hasError) {
      process.exit(1);
    }
    console.log(bold(magenta(`\nDone building package: ${white(getPackageName())}`)));
  }
}

run();
