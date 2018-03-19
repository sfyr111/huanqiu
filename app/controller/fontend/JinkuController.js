'use strict';

const Controller = require('egg').Controller;

class JinkuController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.session = ctx.session;
    this.request = ctx.request;
    this.jinkuService = ctx.service.jinkuService;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }

  async getAllJinku() {
    const response = await this.jinkuService.getAllJinku();
    this.ctx.body = response;
  }

  async getJinkuList() {
    const response = await this.jinkuService.getJinkuList(this.request.query);
    this.ctx.body = response;
  }

  async getJinkuById() {
    const { id } = this.ctx.params;
    const response = await this.jinkuService.getJinkuById(id);
    this.ctx.body = response;
  }

  async getJinkuByArea() {
    const { area } = this.ctx.params;
    const response = await this.jinkuService.getJinkuByArea(area);
    this.ctx.body = response;
  }

  async searchJinku() {
    const response = await this.jinkuService.searchJinku(this.request.query);
    this.ctx.body = response;
  }
}

module.exports = JinkuController;
