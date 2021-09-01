const mysql = require('mysql')

var cnx = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'productos'
})

const SQL_DELETE = 'DELETE FROM TBL_PRODUCTOS WHERE IDPRODUCTO=2';

cnx.connect(function (error) {
    if (error) {
        console.log("error al conectar a la BD")
    } else {
        cnx.query(SQL_DELETE, function (error, resultado) {
            if (error) {
                console.log("ocurrio un error al eliminar")
            } else {
                console.log("se elimino correctamete" + JSON.stringify(resultado))
            }
        })
    }
})

// blob arregloBytes
//string --> localhost/images/perro.png