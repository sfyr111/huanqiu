'use strict';

// const _config = require('../config');

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_HUAN_QIU';

  // add your config here
  config.middleware = [];

  // config.sequelize = _config.mysql;

  // config.redis = _config.redis;

  // config.sessionRedis = {
  //   key: 'huanqiu',
  //   maxAge: 24 * 3600 * 1000,
  //   httpOnly: true,
  //   encrypt: false,
  // };

  config.security = {
    domainWhiteList: [ 'http://localhost:8888' ],
    csrf: {
      enable: false,
    },
  };
  //
  // exports.view = {
  //   mapping: {
  //     '.ejs': 'ejs',
  //   },
  // };
  //
  // exports.ejs = {};

  exports.multipart = {
    // will append to whilelist
    fileExtensions: [
      '.pdf',
    ],
  };


  config.oss = {
    // client: {
    //   accessKeyId: 'LTAItynAEvcPJHkE',
    //   accessKeySecret: '5cZb18s6ZeBxY6K9duVavWL6Aup7T5',
    //   bucket: 'egg-commerce',
    //   endpoint: 'oss-cn-hangzhou.aliyuncs.com',
    //   timeout: '60s',
    // },
    client: {
      accessKeyId: 'LTAI8ltw5xCoCqpO',
      accessKeySecret: 'HmMIFMsdJLj2mzBmu7m8qpAuig8euV',
      bucket: '365jf-test2',
      endpoint: 'oss-cn-shanghai.aliyuncs.com',
      timeout: '60s',
    },
  };

  return config;
};
