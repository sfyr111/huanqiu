'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/jinku/get_all', controller.fontend.jinkuController.getAllJinku); // 所有金库
  router.get('/jinku/list', controller.fontend.jinkuController.getJinkuList); // 分页
  router.get('/jinku/id/:id', controller.fontend.jinkuController.getJinkuById); // id 查看详情
  router.get('/jinku/area/:area', controller.fontend.jinkuController.getJinkuByArea); // 区域查看列表
  router.get('/jinku/search', controller.fontend.jinkuController.searchJinku); // 关键字搜索列表
};
