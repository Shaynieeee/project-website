const mysql = require('mysql')

const db = mysql.createConnection ({
    host:"localhost", 
    user:"root",
    password:"my-secret-pw", 
    database:"catalog_db"
})

module.exports = db