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
  router.delete('/manage/delete_file/:type/:filename', controller.api.deleteFile); // 删除图片

  router.post('/manage/banner/add', controller.api.addBanner);
  router.put('/manage/banner/update', controller.api.updateBanner);
};
