'use strict';

// had enabled by egg
// exports.static = true;

// exports.sequelize = {
//   enable: true,
//   package: 'egg-sequelize',
// };
//
// exports.redis = {
//   enable: true,
//   package: 'egg-redis',
// };
//
// exports.sessionRedis = {
//   enable: true,
//   package: 'egg-session-redis',
// };

// exports.ejs = {
//   enable: true,
//   package: 'egg-view-ejs',
// };

exports.cors = {
  enable: true,
  package: 'egg-cors',
};


exports.oss = {
  enable: true,
  package: 'egg-oss',
};