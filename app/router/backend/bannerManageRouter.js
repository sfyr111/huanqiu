'use strict';

module.exports = app => {
  const checkAdmin = app.middleware.checkLogin({ checkAdmin: true });
  const { router, controller } = app;

  router.post('/manage/banner/add', checkAdmin, controller.backend.bannerManageController.addBanner);
  router.put('/manage/banner/update/:id', checkAdmin, controller.backend.bannerManageController.updateBanner);
  router.delete('/manage/banner/delete/:id', checkAdmin, controller.backend.bannerManageController.delBanner);
};
