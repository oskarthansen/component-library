const path = require('path');

module.exports = async ({ config }) => {
  // Fonts
  config.module.rules.push({
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    use: [
        {
            loader: 'file-loader',
            query: {
                name: '[name].[ext]'
            }
        }
    ],
    // include: path.resolve(__dirname, '../')
    // type: 'asset/resource',
  });

  return config;
};
