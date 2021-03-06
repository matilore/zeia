const webpackConfigs = require('./webpack');
const defaultConfig = 'development';

module.exports = configName => {
  // If there was no configuration give, assume default
  const requestedConfig = configName || defaultConfig;

  // Return a new instance of the webpack config
  // or the default one if it cannot be found.
  let LoadedConfig = defaultConfig;

  if (webpackConfigs[requestedConfig] !== undefined) {
    LoadedConfig = webpackConfigs[requestedConfig];
  } else {
    console.warn(`
      Provided environment "${configName}" was not found.
      Please use one of the following ones:
      ${Object.keys(webpackConfigs).join(' ')}
    `);
    LoadedConfig = webpackConfigs[defaultConfig];
  }

  const loadedInstance = new LoadedConfig();

  // Set the global environment
  process.env.NODE_ENV = loadedInstance.environment;

  // pass variables to "env" key in .babelrc, if BABEL_ENV == 'dev' => env.dev in .babelrc
  process.env.BABEL_ENV = requestedConfig;

  return loadedInstance.config;
};
