const mysql = require('mysql')

var cnx = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'productos'
})

//definiendo el query a ejecutar
const SQL = "CREATE TABLE TBL_PRODUCTOS (idProducto integer primary key, nombre varchar(100))";

//realiza la conexion a la base de datos
cnx.connect(function (error) {
    if (error) {
        console.log('Ocurrio un error al conectar a la BD' + error)
    } else {
        //realiza la ejecucion de la consulta
        cnx.query(SQL, function (error, resultado) {
            if (error) {
                console.log("Ocurrio un error al crear la tabla" + error)
            } else {
                console.log("La tabla se creo exitosamente")
            }
        })
    }
})

// agregar un campo a la tabla

const SQL_ALTER="ALTER TABLE TBL_PRODUCTOS ADD COLUMN ESTADO VARCHAR(1)";

cnx.connect(function (err){
    if(err){
        console.log('Ocurrio un error')
    }
    else{
        cnx.query(SQL_ALTER, function(err,resultado){
            if(err){
                console.log("Ocurrio un error al modicar la tabla")
            }
            else{
                console.log('La tabla ha sido modicada')
            }
        })
    }
})