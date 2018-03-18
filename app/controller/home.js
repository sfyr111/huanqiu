'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    await this.ctx.render('home.ejs', { title: 'home', home: 'is home', style: 'public/css/home.css' });
  }
}

module.exports = HomeController;
