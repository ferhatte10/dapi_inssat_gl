module.exports = function(sequelize, DataTypes) {
    return sequelize.define('KEYCLOAK_GROUP', {
        ID: {
            type: DataTypes.STRING(36),
            allowNull: false,
            primaryKey: true
        },
        NAME: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        PARENT_GROUP: {
            type: DataTypes.STRING(36),
            allowNull: false
        },
        REALM_ID: {
            type: DataTypes.STRING(36),
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'KEYCLOAK_GROUP',
        timestamps: false,
        dbName: 'intranet_auth',
        schema: 'intranet_auth',
    });
};
