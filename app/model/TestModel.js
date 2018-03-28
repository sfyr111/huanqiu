module.exports = app => {
  const { DATE, UUID, UUIDV4, STRING, TEXT, INTEGER, CHAR, TINYINT, SMALLINT, MEDIUMINT } = app.Sequelize;

  const TestModel = app.model.define('test', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    STRING: {
      type: STRING,
    },
    CHAR: {
      type: CHAR,
    },
    TEXT_TINY: {
      type: TEXT('tiny'),
    },
    TEXT_MEDIUM: {
      type: TEXT('medium'),
    },
    TEXT_LONG: {
      type: TEXT('long'),
    },
    TINYINT: {
      type: TINYINT,
    },
    SMALLINT: {
      type: SMALLINT,
    },
    MEDIUMINT: {
      type: MEDIUMINT,
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
    tablseName: 'test',
  }, {
    classMethods: {
      associate() {},
    },
  });

  return TestModel;
};
