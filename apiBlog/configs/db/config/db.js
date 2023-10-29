const Sequelize = require("sequelize")
const {SQL} = require("../../env")
const init_models = require("../models/init-models")
const dbInstance = new Sequelize(SQL.DB_NAME, SQL.DB_USER, SQL.DB_PASS, {
  host: SQL.DB_HOST,
  port: SQL.DB_PORT,
  dialect: 'mariadb',
  define: {
    timestamps: false
  },
  logging: SQL.DB_LOGGING === "true" ? console.log : false
})

//const db = {}

const db = init_models(dbInstance, Sequelize)

db.Sequelize = Sequelize
db.dbInstance = dbInstance


//db.blogs = require("../models/blog.model")(dbInstance, Sequelize)


module.exports = db