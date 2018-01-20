import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import BaseWebpackConfig from './base';

class DevelopmentWebpackConfig extends BaseWebpackConfig {
  constructor() {
    super();
    this.config = {
      devServer: {
        contentBase: this.buildPath,
        compress: true,
        port: 9000,
        stats: 'errors-only',
        open: true,
        openPage: '',
        historyApiFallback: true,
        hot: true
      },
      module: {
        rules: [
          {
            enforce: 'pre',
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'eslint-loader'
          },
          {
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: 'babel-loader'
          },
          {
            test: /\.(scss|sass)$/,
            use: [
              'style-loader',
              'css-loader?sourceMap',
              'sass-loader'
            ]
          },
          {
            test: /\.(jpe?g|svg|png|gif)$/,
            use: [
              'file-loader?name=images/[name].[ext]',
              'image-webpack-loader'
            ]
          },
          {
            test: /\.(html)$/,
            use: {
              loader: 'html-loader',
              options: {
                attrs: ['img:src', 'link:href']
              }
            }
          }
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html'
        }),
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify(this.environment)
          }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
      ]
    }
  }

  get environment() {
    return 'development';
  }
}

module.exports = DevelopmentWebpackConfig;
