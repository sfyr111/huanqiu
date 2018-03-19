const Service = require('egg').Service;

module.exports = app => class BannerService extends Service {
  constructor(ctx) {
    super(ctx);
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
    this.BannerModel = ctx.model.BannerModel;
  }

  async addBanner(banner) {
    const result = await this.BannerModel.create(banner).then(r => r && r.toJSON());
    return this.ServerResponse.createBySuccessMsgAndData('创建轮播图成功', result);
  }

  async updateBanner({ id }, banner) {
    if (!id) return this.ServerResponse.createByErrorMsg('参数错误');
    try {
      const count = await this.BannerModel.count({ where: { id } });
      if (count < 1) return this.ServerResponse.createByErrorMsg('banner 不存在');
      const [ updateCount, [ updateRow ]] = await this.BannerModel.update(banner, {
        where: { id },
        individualHooks: true,
      });
      if (updateCount < 1) return this.ServerResponse.createByErrorMsg('更新失败');
      return this.ServerResponse.createBySuccessMsgAndData('更新轮播图成功', updateRow.toJSON());
    } catch (e) {
      this.ctx.logger.error(new Error(`updateBanner fail: ${e.stack}`));
      return this.ServerResponse.createByErrorMsg(`更新失败 ${e.stack}`);
    }
  }

  async getAllBanner() {
    try {
      const banners = await this.BannerModel.findAll().then(rows => rows && rows.map(r => r && r.toJSON()));
      return this.ServerResponse.createBySuccessData(banners);
    } catch (e) {
      this.ctx.logger.error(new Error(`getAllBanner fail: ${e.stack}`));
      return this.ServerResponse.createByErrorMsg(`获取失败 ${e.stack}`);
    }
  }

  async delBanner({ id }) {
    if (!id) return this.ServerResponse.createByErrorMsg('参数错误');
    try {
      const count = await this.BannerModel.count({ where: { id } });
      if (count < 1) return this.ServerResponse.createByErrorMsg('banner 不存在');
      const delCount = await this.BannerModel.destroy({ where: { id } });
      if (delCount < 0) return this.ServerResponse.createByErrorMsg('删除 banner 失败');
      return this.ServerResponse.createBySuccessMsg('删除 banner 成功');
    } catch (e) {
      this.ctx.logger.error(new Error(`delBanner fail: ${e.stack}`));
      return this.ServerResponse.createByErrorMsg(`删除失败 ${e.stack}`);
    }
  }
};
