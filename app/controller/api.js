'use strict';

const Controller = require('egg').Controller;

class ApiController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.session = ctx.session;
    this.request = ctx.request;
    this.fileService = ctx.service.fileService;
    this.bannerService = ctx.service.bannerService;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }

  // 上传图片
  async upload() {
    const response = await this.fileService.upload();
    this.ctx.body = response;
  }

  // 删除图片
  async deleteFile() {
    const response = await this.fileService.deleteFile(this.ctx.params);
    this.ctx.body = response;
  }

  async adminLogin() {
    let response;
    const { username, password } = this.request.body;
    if (username === 'admin' && password === 'YWRtaW4=') {
      this.session.currentUser = { username, role: 1 };
      response = this.ServerResponse.createBySuccessMsg('登录成功');
    } else response = this.ServerResponse.createByErrorMsg('登录失败');
    this.ctx.body = response;
  }

  async logout() {
    this.ctx.session = null;
    this.ctx.body = this.ServerResponse.createBySuccessMsg('登出');
  }

  async addBanner() {
    const response = await this.bannerService.addBanner(this.request.body);
    this.ctx.body = response;
  }

  async updateBanner() {
    const response = await this.bannerService.updateBanner(this.ctx.params, this.request.body);
    this.ctx.body = response;
  }

  async getAllBanner() {
    const response = await this.bannerService.getAllBanner();
    this.ctx.body = response;
  }

  async delBanner() {
    const response = await this.bannerService.delBanner(this.ctx.params);
    this.ctx.body = response;
  }
}

module.exports = ApiController;
