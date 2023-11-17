module.exports = (dbInstance, Sequelize) => {

  return dbInstance.define('article', {
    id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "Identifiant unique de l'article"
    },
    title: {
      type: Sequelize.STRING(100),
      allowNull: false,
      comment: "Titre de l'article"
    },
    description: {
      type: Sequelize.STRING(180),
      allowNull: false
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    thumbnail: {
      type: Sequelize.STRING(120),
      allowNull: false
    },
    principal_image: {
      type: Sequelize.STRING(120),
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM('Published','Draft','Pending Review','Scheduled','Private','Password Protected','Archived','Trash','Sticky','Inactive'),
      allowNull: false,
      defaultValue: "Published",
      comment: "Status of the article"
    },
    flag_count: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    like_count: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    is_pinned: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    is_blacklisted: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    comment_authorized: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
    published_at: {
      type: Sequelize.DATE,
      allowNull: false
    },
    author_id: {
      type: Sequelize.STRING(36),
      allowNull: false,
      // references: {
      //   model: 'USER_ENTITY',
      //   key: 'ID'
      // }
    },
    category_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'category',
        key: 'id'
      }
    }
  }, {
    dbInstance,
    tableName: 'article',
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
      // {
      //   name: "article_author",
      //   using: "BTREE",
      //   fields: [
      //     { name: "author_id" },
      //   ]
      // },
      {
        name: "article_category",
        using: "BTREE",
        fields: [
          { name: "category_id" },
        ]
      },
    ]
  });
};
