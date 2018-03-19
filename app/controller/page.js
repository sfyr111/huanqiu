'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');

class PageController extends Controller {
  async index() {
    // await this.ctx.render('home.ejs', { title: 'home', home: 'is home', style: 'public/css/home.css' });
    this.ctx.set('Content-Type', 'text/html');
    this.ctx.body = fs.createReadStream(path.join(this.config.static.dir, 'home.html'));
  }
  async admin() {
    await this.ctx.render('admin.ejs', { title: 'admin' });
  }
}

module.exports = PageController;
