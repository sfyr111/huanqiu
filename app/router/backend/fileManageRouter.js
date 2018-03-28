'use strict';

module.exports = app => {
  const { router, controller } = app;
  const checkAdmin = app.middleware.checkLogin({ checkAdmin: true });

  router.put('/test/upload', controller.backend.fileManageController.upload);

  router.put('/manage/upload', checkAdmin, controller.backend.fileManageController.upload);

  router.delete('/manage/delete_file/:type/:filename', checkAdmin, controller.backend.fileManageController.deleteFile);
};
