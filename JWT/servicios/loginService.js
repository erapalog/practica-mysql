var conexion = require('../conexion/conexion')


function login(usuario, clave) {
    //1 es activo
    //2 es inactivo
    const SQL_LOGIN = "select *from tblusuario where nombreUsuario=? and clave=? and estado=1";
    return new Promise((resolve, reject) => {
        conexion.query(SQL_LOGIN, [usuario, clave], (err, resultado) => {
            if (err) reject(err)
            else resolve(resultado)
        })
    })

}

module.exports={
    login:login

}