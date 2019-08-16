const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  entry: {
    app: path.join(__dirname, './../', 'src/index.tsx')
  },
  output: {
    path: path.join(__dirname, './../', 'dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.join(__dirname, './../', 'tsconfig.json')
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              useCache: true,
              cacheDirectory: path.join(__dirname, './../', '.cache-loader')
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        include: [path.join(__dirname, './../', 'src')],
        use: [
          'style-loader',
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: path.join(__dirname, './../', '.cache-loader')
            }
          },
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              modules: true,
              namedExport: true,
              camelCase: true,
              sass: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.join(__dirname, './../', 'src/styles')]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'build/tpl/index.html'
    })
  ]
}
