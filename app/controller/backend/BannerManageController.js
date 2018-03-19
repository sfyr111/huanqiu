'use strict';

const Controller = require('egg').Controller;

class BannerManageController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.session = ctx.session;
    this.request = ctx.request;
    this.bannerService = ctx.service.bannerService;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }

  // 添加轮播
  async addBanner() {
    const response = await this.bannerService.addBanner(this.request.body);
    this.ctx.body = response;
  }

  // 更新轮播
  async updateBanner() {
    const response = await this.bannerService.updateBanner(this.ctx.params, this.request.body);
    this.ctx.body = response;
  }

  // 获取轮播
  async getAllBanner() {
    const response = await this.bannerService.getAllBanner();
    this.ctx.body = response;
  }

  // 删除轮播
  async delBanner() {
    const response = await this.bannerService.delBanner(this.ctx.params);
    this.ctx.body = response;
  }
}

module.exports = BannerManageController;
