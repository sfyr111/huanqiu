module.exports = app => {
  const checkLogin = app.middleware.checkLogin({});
  app.router.post('/user/login', app.controller.fontend.userController.login);

  app.router.get('/user/logout', app.controller.fontend.userController.logout);

  app.router.post('/user/register', app.controller.fontend.userController.register);

  app.router.get('/user/checkValid/:type/:value', app.controller.fontend.userController.checkValid);

  app.router.get('/user/getUserSession', checkLogin, app.controller.fontend.userController.getUserSession);

  app.router.get('/user/forgetGetQuestion/:username', app.controller.fontend.userController.forgetGetQuestion);

  app.router.post('/user/forgetCheckAnswer', app.controller.fontend.userController.forgetCheckAnswer);

  app.router.put('/user/forgetRestPassword', app.controller.fontend.userController.forgetRestPassword);

  app.router.put('/user/resetPassword', checkLogin, app.controller.fontend.userController.resetPassword);

  app.router.put('/user/updateUserInfo', checkLogin, app.controller.fontend.userController.updateUserInfo);

  app.router.get('/user/getUserInfo', checkLogin, app.controller.fontend.userController.getUserInfo);
};
