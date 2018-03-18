'use strict';

/**
 * @param {Egg.Application} app - egg application
*/
module.exports = app => {
  const { router, controller } = app;
  // 页面
  router.get('/', controller.page.index);
  router.get('/admin', controller.page.admin);

  router.put('/manage/upload', controller.api.upload); // 图片上传
  router.delete('/manage/deleteImage/:filename', controller.api.deleteImage); // 删除图片
};
