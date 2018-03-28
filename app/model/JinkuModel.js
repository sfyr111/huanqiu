module.exports = app => {
  const { DATE, UUID, UUIDV4, STRING, TEXT, INTEGER } = app.Sequelize;

  const JinkuModel = app.model.define('jinku', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: UUID,
      allowNull: true,
    },
    name: {
      type: STRING(200),
      allowNull: true,
    },
    // 职务
    job: {
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
    // 领域
    field: {
      type: TEXT('long'),
      allowNull: true,
    },
    // 简介
    Introduction: {
      type: TEXT('long'),
      allowNull: true,
    },
    show: {
      type: INTEGER,
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
    tablseName: 'jinku',
  }, {
    classMethods: {
      associate() {},
    },
  });
  JinkuModel.beforeBulkUpdate(jinku => {
    jinku.attributes.updateTime = new Date();
    return jinku;
  });

  return JinkuModel;
};
