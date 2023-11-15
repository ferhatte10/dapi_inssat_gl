module.exports = (dbInstance, Sequelize) => {


  return dbInstance.define('follower', {
    id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    follower_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      // references: {
      //   model: 'USER_ENTITY',
      //   key: 'ID'
      // }
    },
    following_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      // references: {
      //   model: 'USER_ENTITY',
      //   key: 'ID'
      // }
    }
  }, {
    dbInstance,
    tableName: 'follower',
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
      //   name: "follower_author",
      //   using: "BTREE",
      //   fields: [
      //     { name: "following_id" },
      //   ]
      // },
      // {
      //   name: "following_author",
      //   using: "BTREE",
      //   fields: [
      //     { name: "follower_id" },
      //   ]
      // },
    ]
  });
};
