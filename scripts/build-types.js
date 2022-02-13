const childProcess = require('child_process');
const path = require('path');
const { promisify } = require('util');
const exec = promisify(childProcess.exec);
const packagePath = process.cwd();
const fse = require('fs-extra');

const buildTypes = async (typesRelativeDir) => {
  const command = `tsc --emitDeclarationOnly --outDir ${typesRelativeDir}`;
  const { stderr } = await exec(command, { cwd: packagePath });

  if (stderr) {
    throw new Error(`'${command}' failed with \n${stderr}`);
  }
};

const copyTypes = async (from, to) => {
  try {
    await fse.copy(path.resolve(from), path.resolve('./build', to));
  } catch (error) {
    throw new Error(`Copy types to ${to} failed`);
  }
};

module.exports = {
  buildTypes,
  copyTypes
};
