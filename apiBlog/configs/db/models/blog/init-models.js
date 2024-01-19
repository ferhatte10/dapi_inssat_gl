let _article = require("./article.model");
let _article_tag = require("./article_tag.model");
let _category = require("./category.model");
let _comment = require("./comment.model");
let _follower = require("./follower.model");
let _like = require("./like.model");
let _tag = require("./tag.model");

let _user_entity = require('../auth/USER_ENTITY');
let _user_attribute = require('../auth/USER_ATTRIBUTE');
let _realm = require('../auth/REALM');

function initModels(dbInstance, Sequelize) {
    //---> auth/keycloak models
    let user_entity = _user_entity(dbInstance.auth, Sequelize);
    let user_attribute = _user_attribute(dbInstance.auth, Sequelize);
    let realm = _realm(dbInstance.auth, Sequelize);

    //---> blog models
    let article = _article(dbInstance, Sequelize);
    let article_tag = _article_tag(dbInstance, Sequelize);
    let category = _category(dbInstance, Sequelize);
    let comment = _comment(dbInstance, Sequelize);
    let follower = _follower(dbInstance, Sequelize);
    let like = _like(dbInstance, Sequelize);
    let tag = _tag(dbInstance, Sequelize);

    article_tag.belongsTo(article, { as: "article", foreignKey: "article_id"});
    article.hasMany(article_tag, { as: "article_tags", foreignKey: "article_id"});
    comment.belongsTo(article, { as: "article", foreignKey: "article_id"});
    article.hasMany(comment, { as: "comments", foreignKey: "article_id"});
    like.belongsTo(article, { as: "article", foreignKey: "article_id"});
    article.hasMany(like, { as: "likes", foreignKey: "article_id"});
    article.belongsTo(category, { as: "category", foreignKey: "category_id"});
    category.hasMany(article, { as: "articles", foreignKey: "category_id"});
    comment.belongsTo(comment, { as: "parent", foreignKey: "parent_id"});
    comment.hasMany(comment, { as: "comments", foreignKey: "parent_id"});
    article_tag.belongsTo(tag, { as: "tag", foreignKey: "tag_id"});
    tag.hasMany(article_tag, { as: "article_tags", foreignKey: "tag_id"});

    article.belongsTo(user_entity, { as: "author", foreignKey: "author_id"});
    user_entity.hasMany(article, { as: "articles", foreignKey: "author_id"});

    user_attribute.belongsTo(user_entity, { as: "user", foreignKey: "USER_ID"});
    user_entity.hasMany(user_attribute, { as: "user_attr", foreignKey: "USER_ID"});

    user_entity.belongsTo(realm, { as: "realm", foreignKey: "REALM_ID"});
    realm.hasMany(user_entity, { as: "user_entities", foreignKey: "REALM_ID"});

    // comment.belongsTo(user, { as: "user", foreignKey: "user_id"});
    // user.hasMany(comment, { as: "comments", foreignKey: "user_id"});
    // follower.belongsTo(user, { as: "follower", foreignKey: "follower_id"});
    // user.hasMany(follower, { as: "followers", foreignKey: "follower_id"});
    // follower.belongsTo(user, { as: "following", foreignKey: "following_id"});
    // user.hasMany(follower, { as: "following_followers", foreignKey: "following_id"});
    // like.belongsTo(user, { as: "user", foreignKey: "user_id"});
    // user.hasMany(like, { as: "likes", foreignKey: "user_id"});

    const user = user_entity;
    return {
        article,
        article_tag,
        category,
        comment,
        follower,
        like,
        tag,
        user_entity,
        user,
        user_attribute,
        realm,
    };
}
module.exports = initModels;

