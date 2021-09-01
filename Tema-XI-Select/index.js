const mysql = require("mysql")

const cnx = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'productos'
});


const SQL_SELECT = "select *from tbl_productos";

cnx.connect(function (error) {
    if (error) {
        console.log("No se pudo conectar a la BD")
    } else {
        cnx.query(SQL_SELECT, function (error, resultado) {
            if (error) {
                console.log('Ocurrio un error al realizar el select de produtcot')
            } else {
                console.log(resultado)
                console.log("-------------------------")
                for (let item of resultado) {
                    console.log(item.idProducto)
                    console.log(item.nombre)
                    console.log(item.ESTADO)
                    console.log("-------------------------");
                }
            }
        })
    }
})

