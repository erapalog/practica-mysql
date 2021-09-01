const mysql = require('mysql')

const cnx = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'productos'
})


const QUERY_UPDATE = 'UPDATE TBL_PRODUCTOS SET NOMBRE=?, ESTADO=? WHERE IDPRODUCTO=?';
const arrayOptions = ['CALCETINES', 'B', 2];

cnx.connect(function (error) {
    if (error) {
        console.log("Error al conectar a la BD")
    } else {
        cnx.query(QUERY_UPDATE, arrayOptions, function (error, resultado) {
            if (error) {
                console.log("Ocurrio un error al actualizar")
            } else {
                console.log("se actualizo correctamebte")
            }
        })

    }
})