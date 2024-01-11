const db = require('./db/config/db')
const {SEED_ACTIVATED} = require("./env");
const {seedAll} = require("../seeders");


exports.setupDatabase = () => {
    db.dbInstance.sync().then(() => { // This will sync the database with the models (update any changes)
        console.log("Database is synced")
        // This will seed the database with the data
        if(SEED_ACTIVATED === "true"){
            seedAll()
        }
    }).catch((err) => {
        console.log(err)
    })
}