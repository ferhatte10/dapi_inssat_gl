module.exports = (dbInstance, Sequelize) => {


  return dbInstance.define('comment', {
    id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    is_published: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
    parent_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'comment',
        key: 'id'
      }
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
      type: Sequelize.STRING(36),
      allowNull: false,
      // references: {
      //   model: 'USER_ENTITY',
      //   key: 'ID'
      // }
    }
  }, {
    dbInstance,
    tableName: 'comment',
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
        name: "comment_article",
        using: "BTREE",
        fields: [
          { name: "article_id" },
        ]
      },
      {
        name: "comment_comment",
        using: "BTREE",
        fields: [
          { name: "parent_id" },
        ]
      },
      // {
      //   name: "comment_user",
      //   using: "BTREE",
      //   fields: [
      //     { name: "user_id" },
      //   ]
      // },
    ]
  });
};
