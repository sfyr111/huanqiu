'use strict';

const Controller = require('egg').Controller;

class JinkuManageController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.session = ctx.session;
    this.request = ctx.request;
    this.jinkuService = ctx.service.jinkuService;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }

  async addJinku() {
    const response = await this.jinkuService.addJinku(this.request.body);
    this.ctx.body = response;
  }

  async updateJinkuById() {
    const { id } = this.ctx.params;
    const response = await this.jinkuService.updateJinkuById(id, this.request.body);
    this.ctx.body = response;
  }

  async deleteJinkuById() {
    const { id } = this.ctx.params;
    const response = await this.jinkuService.deleteJinkuById(id);
    this.ctx.body = response;
  }
}

module.exports = JinkuManageController;
