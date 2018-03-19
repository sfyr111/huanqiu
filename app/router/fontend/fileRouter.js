'use strict';

module.exports = app => {
  const checkLogin = app.middleware.checkLogin({});
  const { router, controller } = app;

  router.put('/upload', checkLogin, controller.fontend.fileController.fontendUpload);
  router.delete('/delete_file/:type/:filename', checkLogin, controller.fontend.fileController.fontendDeleteFile);
};
