const TerserPlugin = require('../src');

exports.minifyJS = function minifyJS(options) {
  return {
    plugins: [
      new TerserPlugin(options),
    ],
  };
};
