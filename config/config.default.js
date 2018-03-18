'use strict';

const _config = require('../config');

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_HUAN_QIU';

  // add your config here
  config.middleware = [];

  config.sequelize = _config.mysql;

  config.redis = _config.redis;

  config.sessionRedis = {
    key: 'huanqiu',
    maxAge: 24 * 3600 * 1000,
    httpOnly: true,
    encrypt: false,
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  exports.view = {
    mapping: {
      '.ejs': 'ejs',
    },
  };

  exports.ejs = {};

  exports.multipart = {
    // will append to whilelist
    fileExtensions: [
      '.pdf',
    ],
  };

  return config;
};
