'use strict';

const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs');
const util = require('util');
const sendToWormhole = require('stream-wormhole');

class ApiController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.session = ctx.session;
    this.resquest = ctx.request;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }

  // 上传图片
  async upload() {
    let response;
    const stream = await this.ctx.getFileStream();
    const extname = path.extname(stream.filename);
    const name = path.basename(stream.filename, extname);
    const filename = name + Date.now() + extname;
    let result;
    try {
      // 本地上传
      const ws = fs.createWriteStream(path.resolve('app/public/image/' + filename));
      stream.pipe(ws);
      // oss 服务
      // result = await this.ctx.oss.put(name + now, stream)
      response = this.ServerResponse.createBySuccessMsgAndData('上传图片成功', {
        filename,
        url: result ? result.url : 'localhost:7001/public/image/' + filename,
        fields: stream.fields,
      });
    } catch (e) {
      response = this.ServerResponse.createByError('上传图片失败');
      this.ctx.loggger.error(new Error(`上传图片失败, filename: ${filename}`));
      await sendToWormhole(stream);
      throw new Error(e);
    } finally { await sendToWormhole(stream); }

    this.ctx.body = response;
  }

  // 删除图片
  async deleteImage() {
    let response;
    const { filename } = this.ctx.params;
    const unlinkAsync = util.promisify(fs.unlink);
    try {
      await unlinkAsync(path.resolve('app/public/image/' + filename));
      response = this.ServerResponse.createBySuccessMsg('删除图片成功');
    } catch (e) {
      response = this.ServerResponse.createByErrorMsg('删除图片失败');
      this.ctx.loggger.error(new Error(`删除图片失败, filename: ${filename}`));
    }
    this.ctx.body = response;
  }
}

module.exports = ApiController;
