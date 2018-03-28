const Service = require('egg').Service;
const path = require('path');
const fs = require('fs');
const util = require('util');
const sendToWormhole = require('stream-wormhole');
const _ = require('lodash');
const filenameConfig = require('../common/filenameConfig');

module.exports = app => class FileService extends Service {
  constructor(ctx) {
    super(ctx);
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }

  async upload() {
    const stream = await this.ctx.getFileStream();
    const { type } = stream.fields;
    const filePath = filenameConfig[type];
    if (!filePath) return this.ServerResponse.createByErrorMsg('上传文件类型出错');
    const extname = path.extname(stream.filename);
    const name = path.basename(stream.filename, extname);
    const filename = name + Date.now() + extname;
    let result;
    try {
      // 本地上传
      // const ws = fs.createWriteStream(path.resolve(`app/public/manage/${filePath}/${filename}`));
      // stream.pipe(ws);
      // oss 服务
      result = await this.ctx.oss.put(name + Date.now(), stream);
      console.log(result)
      return this.ServerResponse.createBySuccessMsgAndData('上传文件成功', {
        filename,
        url: result ? result.url : `localhost:7001/public/manage/${filePath}/${filename}`,
        fields: stream.fields,
      });
    } catch (e) {
      console.log(e)
      this.ctx.logger.error(new Error(`上传图片失败, filename: ${filename}`));
      await sendToWormhole(stream);
      return this.ServerResponse.createByError('上传文件失败');
    } finally { await sendToWormhole(stream); }
  }

  async deleteFile({ filename, type }) {
    const unlinkAsync = util.promisify(fs.unlink);
    const filePath = filenameConfig[type];
    if (!filePath) return this.ServerResponse.createByErrorMsg('类型出错');
    try {
      await unlinkAsync(path.resolve(`app/public/manage/${filePath}/${filename}`));
      return this.ServerResponse.createBySuccessMsg('删除文件成功');
    } catch (e) {
      this.ctx.logger.error(new Error(`删除文件失败, filename: ${e.stack}`));
      return this.ServerResponse.createByErrorMsg('删除文件失败');
    }
  }

  async fontendUpload() {
    const stream = await this.ctx.getFileStream();
    const { type } = stream.fields;
    const filePath = filenameConfig[type];
    if (!filePath) return this.ServerResponse.createByErrorMsg('上传文件类型出错');
    const extname = path.extname(stream.filename);
    const name = path.basename(stream.filename, extname);
    const filename = name + Date.now() + extname;
    let result;
    try {
      // 本地上传
      const ws = fs.createWriteStream(path.resolve(`app/public/fontend/${filePath}/${filename}`));
      stream.pipe(ws);
      // oss 服务
      // result = await this.ctx.oss.put(name + now, stream)
      return this.ServerResponse.createBySuccessMsgAndData('上传文件成功', {
        filename,
        url: result ? result.url : `localhost:7001/public/fontend/${filePath}/${filename}`,
        fields: stream.fields,
      });
    } catch (e) {
      this.ctx.logger.error(new Error(`上传图片失败, filename: ${filename}`));
      return this.ServerResponse.createByError('上传文件失败');
      await sendToWormhole(stream);
      throw new Error(e);
    } finally { await sendToWormhole(stream); }
  }

  async fontendDeleteFile({ filename, type }) {
    const unlinkAsync = util.promisify(fs.unlink);
    const filePath = filenameConfig[type];
    if (!filePath) return this.ServerResponse.createByErrorMsg('类型出错');
    try {
      await unlinkAsync(path.resolve(`app/public/fontend/${filePath}/${filename}`));
      return this.ServerResponse.createBySuccessMsg('删除文件成功');
    } catch (e) {
      this.ctx.logger.error(new Error(`删除文件失败, filename: ${e.stack}`));
      return this.ServerResponse.createByErrorMsg('删除文件失败');
    }
  }
};
