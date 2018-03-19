'use strict';

/**
 * @param {Egg.Application} app - egg application
*/
module.exports = app => {
  const { router, controller } = app;
  // 页面
  router.get('/', controller.page.index);
  router.get('/admin', controller.page.admin);

  // fontend
  require('./router/fontend/bannerRouter')(app);
  require('./router/fontend/fileRouter')(app);
  require('./router/fontend/jinkuRouter')(app);
  require('./router/fontend/userRouter')(app);

  // backend
  require('./router/backend/bannerManageRouter')(app);
  require('./router/backend/fileManageRouter')(app);
  require('./router/backend/jinkuManageRouter')(app);
};
