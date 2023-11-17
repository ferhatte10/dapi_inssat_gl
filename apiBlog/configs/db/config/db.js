const Sequelize = require("sequelize")
const {SQL} = require("../../env")
const init_models = require("../models/blog/init-models")


const CONFIGURATION = {
  host: SQL.DB_HOST,
  port: SQL.DB_PORT,
  dialect: 'mariadb',
  // define: {
  //   timestamps: false
  // },
  logging: SQL.DB_LOGGING === "true" ? console.log : false
}





//Note : we can consider dbInstance(s) as an array of objects 'sequelize'
//so that we can iterate on each instance and synchronize it to the DB in the index.js main file    
//anyway dbInstance contains the current/main db (intranet_blog) instance
//and the dbInstance.auth contains the  intranet_auth instance.
//TODO: little structural enhancement never kill ;)
 
const dbInstance = new Sequelize(SQL.DB_NAME, SQL.DB_USER, SQL.DB_PASS, CONFIGURATION)
dbInstance.auth = new Sequelize(SQL.DB_NAME_AUTH, SQL.DB_USER, SQL.DB_PASS,  CONFIGURATION)


const db = init_models(dbInstance, Sequelize)

db.Sequelize = Sequelize
db.dbInstance = dbInstance


module.exports = db