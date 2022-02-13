const childProcess = require('child_process');
const path = require('path');
const { promisify } = require('util');
const exec = promisify(childProcess.exec);
const srcDir = path.resolve('./src');

const build = async (format) => {
  const env = {
    NODE_ENV: 'production',
    BABEL_ENV: format
  };

  const babelConfigPath = path.resolve(__dirname, '../babel.config.js');

  const extensions = ['.js', '.ts', '.tsx'];
  const ignore = [
    '**/*.test.js',
    '**/*.test.ts',
    '**/*.test.tsx',
    '**/*.spec.js',
    '**/*.spec.ts',
    '**/*.spec.tsx',
    '**/*.d.ts',
    '**/*.stories.js',
    '**/*.stories.ts',
    '**/*.stories.tsx',
    '**/*.stories.mdx'
  ];

  const outDir = path.resolve(
    './build',
    {
      esm: './esm',
      cjs: './cjs'
    }[format]
  );

  const babelArgs = [
    '--config-file',
    babelConfigPath,
    '--extensions',
    `"${extensions.join(',')}"`,
    srcDir,
    '--out-dir',
    outDir,
    '--ignore',
    // Need to put these patterns in quotes otherwise they might be evaluated by the used terminal.
    `"${ignore.join('","')}"`
  ];

  const command = ['npx babel', ...babelArgs].join(' ');

  const { stderr } = await exec(command, { env: { ...process.env, ...env } });
  if (stderr) {
    throw new Error(`'${command}' failed with \n${stderr}`);
  }
};

module.exports = build;
