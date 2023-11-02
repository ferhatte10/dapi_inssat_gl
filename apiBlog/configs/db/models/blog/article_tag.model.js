module.exports = (dbInstance, Sequelize) => {


  return dbInstance.define('article_tag', {
    id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Identifiant unique de l''article."
    },
    tag_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'tag',
        key: 'id'
      }
    },
    article_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }, {
    dbInstance,
    tableName: 'article_tag',
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
        name: "article_tag_tag",
        using: "BTREE",
        fields: [
          { name: "tag_id" },
        ]
      },
    ]
  });
};
