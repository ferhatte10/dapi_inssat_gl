module.exports = (dbInstance, Sequelize) => {


  return dbInstance.define('like', {
    id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    article_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'article',
        key: 'id'
      }
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'USER_ENTITY',
        key: 'ID'
      }
    }
  }, {
    dbInstance,
    tableName: 'like',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "like_article",
        using: "BTREE",
        fields: [
          { name: "article_id" },
        ]
      },
      {
        name: "like_user",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
