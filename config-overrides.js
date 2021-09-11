/* eslint-disable @typescript-eslint/no-var-requires */
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = function override(config, env) {
  return {
    ...config,
    resolve: {
      ...config.resolve,
      plugins: [
        new TsconfigPathsPlugin({
          configFile: 'tsconfig.paths.json',
        }),
      ],
    },
  };
};
