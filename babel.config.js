const productionPlugins = [['react-remove-properties', { properties: ['data-testid'] }]];

// Todo: Should we make a different babelRC for base-components, another for themed-components etc?

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
        // browserslistEnv: process.env.BABEL_ENV || process.env.NODE_ENV,
        targets: {
          browsers: ['last 2 versions']
        },

        debug: false,
        // modules: useESModules ? false : 'commonjs',
        modules: modules[process.env.BABEL_ENV],
        shippedProposals: api.env('modern')
      }
    ],
    [
      '@babel/preset-react'
      // {
      //   runtime: 'automatic',
      // },
    ],
    '@babel/preset-typescript'
  ];

  const plugins = [
    // [
    //   'babel-plugin-macros',
    //   {
    //     muiError: {
    //       errorCodesPath,
    //       missingError,
    //     },
    //   },
    // ],
    // 'babel-plugin-optimize-clsx',
    // Need the following 3 proposals for all targets in .browserslistrc.
    // With our usage the transpiled loose mode is equivalent to spec mode.
    // ['@babel/plugin-proposal-class-properties', { loose: true }],
    // ['@babel/plugin-proposal-private-methods', { loose: true }],
    // ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    // ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
    // [
    //   '@babel/plugin-transform-runtime',
    //   {
    //     useESModules,
    //     // any package needs to declare 7.4.4 as a runtime dependency. default is ^7.0.0
    //     version: '^7.4.4',
    //   },
    // ],
    ['@babel/plugin-transform-runtime'],
    // [
    //   'babel-plugin-transform-react-remove-prop-types',
    //   {
    //     mode: 'unsafe-wrap',
    //   },
    // ],
    // '@babel/plugin-syntax-dynamic-import',
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
  // if (process.env.NODE_ENV === 'test') {
  //   plugins.push([
  //     'babel-plugin-module-resolver',
  //     {
  //       alias: defaultAlias,
  //       root: ['./'],
  //     },
  //   ]);
  // }

  return {
    assumptions: {
      noDocumentAll: true
    },
    presets,
    plugins,
    // ignore: [/@babel[\\|/]runtime/], // Fix a Windows issue.
    // overrides: [
    //   {
    //     exclude: /\.test\.(js|ts|tsx)$/,
    //     plugins: ['@babel/plugin-transform-react-constant-elements'],
    //   },
    // ],
    env: {
      // esm: {
      // },
      // cjs: {
      // }
      // coverage: {
      //   plugins: [
      //     'babel-plugin-istanbul',
      //     [
      //       'babel-plugin-module-resolver',
      //       {
      //         root: ['./'],
      //         alias: defaultAlias,
      //       },
      //     ],
      //   ],
      // },
      // development: {
      //   plugins: [
      //     [
      //       'babel-plugin-module-resolver',
      //       {
      //         alias: {
      //           ...defaultAlias,
      //           modules: './modules',
      //           'typescript-to-proptypes': './packages/typescript-to-proptypes/src',
      //         },
      //         root: ['./'],
      //       },
      //     ],
      //   ],
      // },
      // legacy: {
      //   plugins: [
      //     // IE11 support
      //     '@babel/plugin-transform-object-assign',
      //   ],
      // },
      // test: {
      //   sourceMaps: 'both',
      //   plugins: [
      //     [
      //       'babel-plugin-module-resolver',
      //       {
      //         root: ['./'],
      //         alias: defaultAlias,
      //       },
      //     ],
      //   ],
      // },
      // benchmark: {
      //   plugins: [
      //     ...productionPlugins,
      //     [
      //       'babel-plugin-module-resolver',
      //       {
      //         alias: defaultAlias,
      //       },
      //     ],
      //   ],
      // },
    }
  };
};
