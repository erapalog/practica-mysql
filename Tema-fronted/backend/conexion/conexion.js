const mysql = require("mysql")
const config = require('../utilidades/config.json')

module.exports = mysql.createConnection({
    host: config.host,
    user: config.usuario,
    password: config.password,
    database: config.baseDatos
})