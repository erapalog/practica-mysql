const conexion = require('../conexion/conexion')
const propertiesConsultas = require('../utilidades/consultas.json')

function selectComentarios() {

    return new Promise((resolve, reject) => {
        conexion.query(propertiesConsultas.mantenimientos.comentarios.selectComentarios, (err, resultado) => {
            if (err) reject(err)
            else resolve(resultado)
        })
    })
}

module.exports = {
    selectComentarios: selectComentarios
}