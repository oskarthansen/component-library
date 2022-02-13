/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
const path = require('path');
const fse = require('fs-extra');
const glob = require('fast-glob');

const packagePath = process.cwd();
const buildPath = path.join(packagePath, './build');
const srcPath = path.join(packagePath, './src');

async function createPackageFile() {
  const packageData = await fse.readFile(path.resolve(packagePath, './package.json'), 'utf8');

  const { directories, files, gitHead, scripts, devDependencies, workspaces, ...packageDataOther } =
    JSON.parse(packageData);

  const newPackageData = {
    ...packageDataOther,
    private: false,
    module: './esm/index.js',
    main: './cjs/index.js',
    types: './esm/index.d.ts',
    sideEffects: false
  };

  const targetPath = path.resolve(buildPath, './package.json');

  await fse.writeFile(targetPath, JSON.stringify(newPackageData, null, 2), 'utf8');
  console.log(`Created package.json in ${targetPath}`);

  return newPackageData;
}

function getNestedFolderPrefix(path) {
  let levelsPrefix = '';
  const levels = path.split('/').length - 1;
  for (let i = 0; i < levels; i++) {
    levelsPrefix += '../';
  }
  return levelsPrefix;
}

async function createModulePackages({ from, to }) {
  const directoryPackages = glob
    .sync('**/index.{js,ts,tsx}', { cwd: from })
    .map(path.dirname)
    .filter((dir) => dir !== '.');

  await Promise.all(
    directoryPackages.map(async (directoryPackage) => {
      const packageBuildDirectory = path.join(to, directoryPackage);
      const packageJsonPath = path.join(to, directoryPackage, 'package.json');

      const levelsPrefix = getNestedFolderPrefix(directoryPackage);

      const packageJson = {
        sideEffects: false,
        module: path.posix.join(levelsPrefix, '../esm/', directoryPackage, 'index.js'),
        main: path.posix.join(levelsPrefix, '../cjs/', directoryPackage, 'index.js'),
        types: path.posix.join(levelsPrefix, '../esm/', directoryPackage, 'index.d.ts')
      };

      if (!fse.existsSync(packageBuildDirectory)) {
        fse.mkdirSync(packageBuildDirectory, { recursive: true });
      }

      const [typingsEntryExist, moduleEntryExists, mainEntryExists] = await Promise.all([
        fse.pathExists(path.resolve(path.dirname(packageJsonPath), packageJson.types)),
        fse.pathExists(path.resolve(path.dirname(packageJsonPath), packageJson.module)),
        fse.pathExists(path.resolve(path.dirname(packageJsonPath), packageJson.main)),
        fse.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2))
      ]);

      const manifestErrorMessages = [];
      if (!typingsEntryExist) {
        manifestErrorMessages.push(`'types' entry '${packageJson.types}' does not exist`);
      }
      if (!moduleEntryExists) {
        manifestErrorMessages.push(`'module' entry '${packageJson.module}' does not exist`);
      }
      if (!mainEntryExists) {
        manifestErrorMessages.push(`'main' entry '${packageJson.main}' does not exist`);
      }
      if (manifestErrorMessages.length > 0) {
        throw new Error(`${packageJsonPath}:\n${manifestErrorMessages.join('\n')}`);
      }

      return packageJsonPath;
    })
  );
}

async function createPackages() {
  try {
    await createPackageFile();
    await createModulePackages({ from: srcPath, to: buildPath });

    // Todo: Should we include README or license files?
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

module.exports = createPackages;
