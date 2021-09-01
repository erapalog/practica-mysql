const mysql = require('mysql')

var cnx = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'productos'
});

//query para insertar

const INSERT_QUERY = 'INSERT INTO TBL_PRODUCTOS (idProducto,nombre,ESTADO) values(2,"Pantalones","E")';

cnx.connect(function (error) {
    if (error) {
        console.log("Error al conectar a la BD")
    } else {
        cnx.query(INSERT_QUERY, function (error, resultado) {
            if (!error) {
                console.log("Se inserto correctamente => " + JSON.stringify(resultado))
            } else {
                console.log('Ocurrio un error al insertar')
            }
        })
    }
})

//{/'nombre':'Erick'/}

//[objet objet]

//Json.stringify()
//Json.parse()