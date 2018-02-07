import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import BaseWebpackConfig from './base';

class ProductionWebpackConfig extends BaseWebpackConfig {
  constructor() {
    super();
    this.config = {
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
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader', 'sass-loader'],
              publicPath: this.buildPath
            })
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
      devtool: 'cheap-module-source-map',
      plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html'
        }),
        new ExtractTextPlugin({
          filename: 'styles.css',
          allChunks: true
        }),
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify(this.environment)
          }
        })
      ]
    };
  }

  get environment() {
    return 'production';
  }
}

module.exports = ProductionWebpackConfig;
