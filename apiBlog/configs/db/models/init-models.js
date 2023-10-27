var DataTypes = require("sequelize").DataTypes;
//TODO: Forgot to Add Article model and others
var _article = require("./article.model");
var _article_tag = require("./article_tag.model");
var _category = require("./category.model");
var _comment = require("./comment.model");
var _follower = require("./follower.model");
var _like = require("./like.model");
var _tag = require("./tag.model");
var _user = require("./user.model");

function initModels(dbInstance, Sequelize) {
  var article = _article(dbInstance, Sequelize);
  var article_tag = _article_tag(dbInstance, Sequelize);
  var category = _category(dbInstance, Sequelize);
  var comment = _comment(dbInstance, Sequelize);
  var follower = _follower(dbInstance, Sequelize);
  var like = _like(dbInstance, Sequelize);
  var tag = _tag(dbInstance, Sequelize);
  var user = _user(dbInstance, Sequelize);

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
  article.belongsTo(user, { as: "author", foreignKey: "author_id"});
  user.hasMany(article, { as: "articles", foreignKey: "author_id"});
  comment.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(comment, { as: "comments", foreignKey: "user_id"});
  follower.belongsTo(user, { as: "follower", foreignKey: "follower_id"});
  user.hasMany(follower, { as: "followers", foreignKey: "follower_id"});
  follower.belongsTo(user, { as: "following", foreignKey: "following_id"});
  user.hasMany(follower, { as: "following_followers", foreignKey: "following_id"});
  like.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(like, { as: "likes", foreignKey: "user_id"});

  return {
    article,
    article_tag,
    category,
    comment,
    follower,
    like,
    tag,
    user,
  };
}
module.exports = initModels;

