const path = require("path");
const razzleHeroku = require("razzle-heroku");

module.exports = {
  modifyWebpackConfig(opts) {
    let config = opts.webpackConfig;

    config = razzleHeroku(
      config,
      { target: opts.env.target, dev: opts.env.dev },
      opts.webpackObject
    );

    return config;
  },
  modifyPaths({
    webpackObject, // the imported webpack node module
    options: {
      razzleOptions, // the modified options passed to Razzle in the `options` key in `razzle.config.js` (options: { key: 'value'})
    },
    paths, // the default paths that will be used by Razzle.
  }) {
    paths.appServerJs = path.join(paths.appPath, "src/server/server.js");
    paths.appServerIndexJs = path.join(paths.appPath, "src/server/index.js");
    paths.appClientIndexJs = path.join(paths.appPath, "src/client/client.js");
    return paths;
  },
};
