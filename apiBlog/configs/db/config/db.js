const Sequelize = require("sequelize")
const {SQL} = require("../../env")

const dbInstance = new Sequelize(SQL.DB_NAME, SQL.DB_USER, SQL.DB_PASS, {
  host: SQL.DB_HOST,
  port: SQL.DB_PORT,
  dialect: 'mariadb',
  define: {
    timestamps: false
  },
  logging: SQL.DB_LOGGING === "true" ? true : false
})

const db = {}

db.Sequelize = Sequelize
db.dbInstance = dbInstance

db.blogs = require("../models/blog.model")(dbInstance, Sequelize)


module.exports = db