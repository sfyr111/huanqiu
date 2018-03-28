const Service = require('egg').Service;

module.exports = app => class JinkuService extends Service {
  constructor(ctx) {
    super(ctx);
    this.JinkuModel = ctx.model.JinkuModel;
    this.JinkuFormModel = ctx.model.JinkuFormModel;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }

  async addJinku(jinku) {
    try {
      if (!jinku) return this.ServerResponse.createByErrorCodeMsg(this.ResponseCode.ILLEGAL_ARGUMENT, '参数错误');
      const result = await this.JinkuModel.create(jinku).then(r => r && r.toJSON());
      if (!result) return this.ServerResponse.createByErrorMsg('添加错误');
      return this.ServerResponse.createBySuccessData('添加成功', result);
    } catch (e) {
      this.ctx.logger.error(new Error(`addJinku fail: ${e.stack}`));
      return this.ServerResponse.createByErrorMsg(`addJinku fail: ${e.stack}`);
    }
  }

  async updateJinkuById(id, jinku) {
    try {
      if (!id || !jinku) return this.ServerResponse.createByErrorCodeMsg(this.ResponseCode.ILLEGAL_ARGUMENT, '参数错误');
      const count = await this.JinkuModel.count({ where: { id } });
      if (count < 1) return this.ServerResponse.createByErrorMsg('不存在');
      const [ updateCount, [ updateRow ]] = await this.JinkuModel.update(jinku, { where: jinku, individualHooks: true });
      if (updateCount < 0) return this.ServerResponse.createByErrorMsg('更新失败');
      return this.ServerResponse.createBySuccessData('更新成功', updateRow.toJSON());
    } catch (e) {
      this.ctx.logger.error(new Error(`updateJinku fail: ${e.stack}`));
      return this.ServerResponse.createByErrorMsg(`updateJinku fail: ${e.stack}`);
    }
  }

  async deleteJinkuById(id) {
    try {
      if (!id) return this.ServerResponse.createByErrorCodeMsg(this.ResponseCode.ILLEGAL_ARGUMENT, '参数错误');
      const count = await this.JinkuModel.count({ where: { id } });
      if (count < 1) return this.ServerResponse.createByErrorMsg('不存在');
      const delCount = await this.JinkuModel.destroy({ where: { id } });
      if (delCount < 0) return this.ServerResponse.createByErrorMsg('删除失败');
      return this.ServerResponse.createBySuccessMsg('删除成功');
    } catch (e) {
      this.ctx.logger.error(new Error(`deleteJinku fail: ${e.stack}`));
      return this.ServerResponse.createByErrorMsg(`deleteJinku fail: ${e.stack}`);
    }
  }

  async getAllJinku() {
    try {
      const result = await this.JinkuModel.findAll().then(rows => rows && rows.map(r => r && r.toJSON()));
      if (!result) return this.ServerResponse.createByErrorMsg('不存在');
      return this.ServerResponse.createBySuccessData(result);
    } catch (e) {
      this.ctx.logger.error(new Error(`getAllJinku fail: ${e.stack}`));
      return this.ServerResponse.createByErrorMsg(`getAllJinku fail: ${e.stack}`);
    }
  }

  async getJinkuList({ pageNum = 1, pageSize = 10}) {
    try {
      const { count, rows } = await this.JinkuModel.findAndCount({
        order: [[ 'createTime', 'DESC' ]],
        limit: Number(pageSize | 0),
        offset: Number(pageNum - 1 | 0) * Number(pageSize | 0),
      });
      if (rows.length < 1) return this.ServerResponse.createBySuccessMsg('无数据');
      return this.ServerResponse.createBySuccessData({
        pageNum,
        pageSize,
        list: rows.map(r => r && r.toJSON()),
        total: count,
      });
    } catch (e) {
      this.ctx.logger.error(new Error(`getJinkuList fail: ${e.stack}`));
      return this.ServerResponse.createByErrorMsg(`getJinkuList fail: ${e.stack}`);
    }
  }

  async getJinkuById(id) {
    try {
      if (!id) return this.ServerResponse.createByErrorCodeMsg(this.ResponseCode.ILLEGAL_ARGUMENT, '参数错误');
      const result = await this.JinkuModel.findOne({ where: { id } }).then(r => r && r.toJSON());
      if (!result) return this.ServerResponse.createByErrorMsg('不存在');
      return this.ServerResponse.createBySuccessData(result);
    } catch (e) {
      this.ctx.logger.error(new Error(`getJinkuById fail: ${e.stack}`));
      return this.ServerResponse.createByErrorMsg(`getJinkuById fail: ${e.stack}`);
    }
  }

  async getJinkuByArea(area) {
    try {
      if (!area) return this.ServerResponse.createByErrorCodeMsg(this.ResponseCode.ILLEGAL_ARGUMENT, '参数错误');
      const result = await this.JinkuModel.findAll({ where: { area }}).then(rows => rows && rows.map(r => r && r.toJSON()));
      if (!result) return this.ServerResponse.createByErrorMsg('不存在');
      return this.ServerResponse.createBySuccessData(result);
    } catch (e) {
      this.ctx.logger.error(new Error(`getJinkuByArea fail: ${e.stack}`));
      return this.ServerResponse.createByErrorMsg(`getJinkuByArea fail: ${e.stack}`);
    }
  }

  async getJinkuBySearch({ keyWord, pageNum = 1, pageSize = 10, sortBy = 'asc' }) {
    try {
      const { count, rows } = await this.JinkuModel.findAndCount({
        where: { $or: [{
          name: { $like: `%${keyWord}%` },
          job: { $like: `%${keyWord}%` },
          city: { $like: `%${keyWord}%` },
          area: { $like: `%${keyWord}%` },
          field: { $like: `%${keyWord}%` },
          Introduction: { $like: `%${keyWord}%` },
        }]},
        order: [[ 'price', sortBy ]],
        limit: Number(pageSize | 0),
        offset: Number(pageNum - 1 | 0) * Number(pageSize | 0),
      });
      if (rows.length < 1) this.ServerResponse.createBySuccessMsg('无数据');
      return this.ServerResponse.createBySuccessData({
        pageNum,
        pageSize,
        list: rows.map(r => r && r.toJSON()),
        total: count,
      });
    } catch (e) {
      this.ctx.logger.error(new Error(`getJinkuBySearch fail: ${e.stack}`));
      return this.ServerResponse.createByErrorMsg(`getJinkuBySearch fail: ${e.stack}`);
    }
  }
};
