module.exports = app => {
  const { DATE, UUID, UUIDV4, STRING, INTEGER } = app.Sequelize;

  const BannerModel = app.model.define('banner', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: STRING(200),
      allowNull: true,
    },
    linkUrl: {
      type: STRING(500),
      allowNull: true,
    },
    imgUrl: {
      type: STRING(500),
      allowNull: false,
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
    show: {
      type: INTEGER,
      allowNull: true,
    },
  }, {
    timestamps: false,
    tablseName: 'banner',
  }, {
    classMethods: {
      associate() {},
    },
  });
  BannerModel.beforeBulkUpdate(banner => {
    banner.attributes.updateTime = new Date();
    return banner;
  });

  return BannerModel;
};
