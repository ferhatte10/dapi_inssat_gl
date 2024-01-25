module.exports = function(sequelize, DataTypes) {
    return sequelize.define('USER_GROUP_MEMBERSHIP', {
        GROUP_ID: {
            type: DataTypes.STRING(36),
            allowNull: false,
            primaryKey: true
        },
        USER_ID: {
            type: DataTypes.STRING(36),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'USER_ENTITY',
                key: 'ID'
            }
        }
    }, {
        sequelize,
        tableName: 'USER_GROUP_MEMBERSHIP',
        timestamps: false,
        dbName: 'intranet_auth',
        schema: 'intranet_auth',
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "GROUP_ID" },
                    { name: "USER_ID" },
                ]
            },
            {
                name: "IDX_USER_GROUP_MAPPING",
                using: "BTREE",
                fields: [
                    { name: "USER_ID" },
                ]
            },
        ]
    });
};
