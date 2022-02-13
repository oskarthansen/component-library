const productionPlugins = [['react-remove-properties', { properties: ['data-testid'] }]];

module.exports = function getBabelConfig(api) {
  const modules = {
    esm: false,
    cjs: 'commonjs'
  };

  const presets = [
    [
      '@babel/preset-env',
      {
        bugfixes: true,
        targets: {
          browsers: ['last 2 versions']
        },

        debug: false,
        modules: modules[process.env.BABEL_ENV],
        shippedProposals: api.env('modern')
      }
    ],
    ['@babel/preset-react'],
    '@babel/preset-typescript'
  ];

  const plugins = [
    ['@babel/plugin-transform-runtime'],
    [
      'babel-plugin-styled-components',
      {
        pure: true,
        namespace: 'ST',
        displayName: false
      }
    ]
  ];

  if (process.env.NODE_ENV === 'production') {
    plugins.push(...productionPlugins);
  }

  return {
    assumptions: {
      noDocumentAll: true
    },
    presets,
    plugins
  };
};
