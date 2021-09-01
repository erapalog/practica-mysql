const mysql = require('mysql')

var cnx = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'productos'
})

const SQL_SELECT_WHERE = "SELECT *FROM TBL_PRODUCTOS WHERE ESTADO='P'";

/*cnx.connect(function (error) {
    if (error) {
        console.log("Ha ocurrido un error al conectar la BD")
    } else {
        cnx.query(SQL_SELECT_WHERE, function (error, resultados) {
            if (error) {
                console.log("Ocurrio un error al realizar la consulta")
            } else {
                imprimirDatos(resultados);

            }
        })
    }
})*/

const estado = 'A'
const id=1;
const SQL_SELECT_WHERE_COMODIN = "SELECT *FROM TBL_PRODUCTOS WHERE ESTADO= ? and idProducto=?";

cnx.connect(function (error) {
    if (error) {
        console.log("Ha ocurrido un error al conectar la BD")
    } else {
        cnx.query(SQL_SELECT_WHERE_COMODIN, [estado,id], function (error, resultados) {
            if (error) {
                console.log("Ocurrio un error al realizar la consulta")
            } else {
                imprimirDatos(resultados);
            }
        })
    }
});

function imprimirDatos(resultados) {
    if (resultados.length > 0) {
        resultados.forEach(element => {
            console.log("Producto: => " + element.idProducto + " Nombre: => " + element.nombre + " Estado: => " + element.ESTADO)
        });
    } else {
        console.log("No se encontraron productos")
    }
}