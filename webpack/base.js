import path from 'path';


class BaseWebpackConfig {
  constructor() {
    this._config = {};
  }
  get srcPath() {
    return path.join(__dirname, '../src');
  }

  get buildPath() {
    return path.join(__dirname, '../dist');
  }

  get defaultConfig() {
    return {
      devtool: 'cheap-module-source-map',
      entry: this.srcPath,
      output: {
        path: this.buildPath,
        filename: 'index_bundle.js'
      },
      resolve: {
        modules: [
          path.resolve('./src'),
          'node_modules'
        ]
      }
    }
  }

  set config(config) {
    this._config = Object.assign({}, this.defaultConfig, config);
  }

  get config() {
    return this._config;
  }

  get environment() {
    return '';
  }
}

module.exports = BaseWebpackConfig;
