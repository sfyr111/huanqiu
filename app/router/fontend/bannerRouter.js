'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/banner/get', controller.backend.bannerManageController.getAllBanner);
};
