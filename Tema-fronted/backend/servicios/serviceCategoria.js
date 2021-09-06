const conexion = require('../conexion/conexion')
const propertiesConsultas = require('../utilidades/consultas.json')

function selectCategorias() {

    return new Promise((resolve, reject) => {
        conexion.query(propertiesConsultas.mantenimientos.catagorias.selectCategorias, (err, resultado) => {
            if (err) reject(err)
            else resolve(resultado)
        })
    })
}

module.exports = {
    selectCategorias: selectCategorias
}