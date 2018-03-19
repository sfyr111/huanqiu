'use strict';

module.exports = app => {
  const checkAdmin = app.middleware.checkLogin({ checkAdmin: true });
  const { router, controller } = app;

  router.post('/manage/jinku/add', checkAdmin, controller.backend.jinkuManageController.addJinku);
  router.put('/manage/jinku/update/:id', checkAdmin, controller.backend.jinkuManageController.updateJinkuById);
  router.delete('/manage/jinku/delete/:id', checkAdmin, controller.backend.jinkuManageController.deleteJinkuById);
};
