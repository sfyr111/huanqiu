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

  // 添加智金库
  async addJinku() {
    const response = await this.bannerService.addBanner(this.request.body);
    this.ctx.body = response;
  }

  // 更新智金库
  async updateJinku() {
    const response = await this.bannerService.updateBanner(this.ctx.params, this.request.body);
    this.ctx.body = response;
  }

  // 获取所有智金库
  async getAllJinku() {
    const response = await this.bannerService.getAllJinku();
    this.ctx.body = response;
  }

  // 删除智金库
  async delJinku() {
    const response = await this.bannerService.delBanner(this.ctx.params);
    this.ctx.body = response;
  }

  // id 查智金库
  async getJinkuById() {
    const response = await this.bannerService.delBanner(this.ctx.params);
    this.ctx.body = response;
  }

  // area 地区查智金库
  async getJinkuByArea() {
    const response = await this.bannerService.delBanner(this.ctx.params);
    this.ctx.body = response;
  }

  // 搜索智金库
  async searchJinku() {
    const response = await this.bannerService.delBanner(this.ctx.params);
    this.ctx.body = response;
  }
}

module.exports = ApiController;
