'use strict';

module.exports = app => {
  const { DATE, UUID, UUIDV4, STRING, TEXT } = app.Sequelize;

  const JinkuFromModel = app.model.define('jinku_from', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: UUID,
      allowNull: false,
    },
    name: {
      type: STRING(200),
      allowNull: true,
    },
    sex: {
      type: STRING(200),
      allowNull: true,
    },
    // 所在城市
    city: {
      type: STRING(200),
      allowNull: true,
    },
    // 区域
    area: {
      type: STRING(200),
      allowNull: true,
    },
    // 证件类型
    paperworkType: {
      type: STRING(200),
      allowNull: true,
    },
    // 证件号
    paperworkNumber: {
      type: STRING(200),
      allowNull: true,
    },
    // 公司
    company: {
      type: STRING(200),
      allowNull: true,
    },
    // 职务
    job: {
      type: STRING(200),
      allowNull: true,
    },
    // 邮箱
    email: {
      type: STRING(200),
      allowNull: true,
    },
    // 电话
    phone: {
      type: STRING(200),
      allowNull: true,
    },
    // 照片url
    photo: {
      type: STRING(200),
      allowNull: true,
    },
    // 证明url
    prove: {
      type: STRING(200),
      allowNull: true,
    },
    // 领域
    field: {
      type: TEXT,
      allowNull: true,
    },
    // 其他
    ext: {
      type: TEXT,
      allowNull: true,
    },
    createTime: {
      type: DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    updateTime: {
      type: DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  }, {
    timestamps: false,
    tablseName: 'jinku_from',
  }, {
    classMethods: {
      associate() {},
    },
  });
  JinkuFromModel.beforeBulkUpdate(from => {
    from.attributes.updateTime = new Date();
    return from;
  });

  return JinkuFromModel;
};
