'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  terser: require('terser/package.json').version, // eslint-disable-line global-require
  plugin: require('../../package.json').version // eslint-disable-line global-require
};