const mysql = require('mysql')

var cnx = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
});

const sql = 'CREATE DATABASE productos';
cnx.connect(function (error, resultado) {
    if (error) {
        console.log('Ocurrio un error' + error)

    } else {
        console.log("Conexion establecida" + resultado);
       
        cnx.query(sql, function (err, resultad) {
            if (err) {
                console.log('Ocurrio un error al ejecutar la consulta' + error)
            } else {
                console.log('Base de datos creada exitosamente '+ resultad);
            }
        })
    }
});