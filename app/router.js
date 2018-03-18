'use strict';

/**
 * @param {Egg.Application} app - egg application
*/
module.exports = app => {
  const checkAdmin = app.middleware.checkLogin({ checkAdmin: true });
  const { router, controller } = app;
  // 页面
  router.get('/', controller.page.index);
  router.get('/admin', controller.page.admin);

  // admin
  router.post('/manage/user/login', controller.api.adminLogin);
  router.get('/user/logout', controller.api.logout);

  // 文件
  router.put('/manage/upload', checkAdmin, controller.api.upload); // 图片上传
  router.delete('/manage/delete_file/:type/:filename', checkAdmin, controller.api.deleteFile); // 删除图片

  // 轮播图
  router.post('/manage/banner/add', checkAdmin, controller.api.addBanner);
  router.put('/manage/banner/update/:id', checkAdmin, controller.api.updateBanner);
  router.delete('/manage/banner/delete/:id', checkAdmin, controller.api.delBanner);
  router.get('/banner/get', controller.api.getAllBanner);
};
