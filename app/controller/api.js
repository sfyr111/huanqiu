'use strict';

const Controller = require('egg').Controller;

class ApiController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.session = ctx.session;
    this.request = ctx.request;
    this.fileService = ctx.service.fileService
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

  async addBanner() {}

  async updateBanner() {}
}

module.exports = ApiController;
