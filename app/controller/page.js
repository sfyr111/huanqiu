'use strict';

const Controller = require('egg').Controller;

class PageController extends Controller {
  async index() {
    await this.ctx.render('home.ejs', { title: 'home', home: 'is home', style: 'public/css/home.css' });
  }
  async admin() {
    await this.ctx.render('admin.ejs', { title: 'admin' });
  }
}

module.exports = PageController;
