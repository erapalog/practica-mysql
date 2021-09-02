const conexion = require('../conexion/conexonDb')
const propertiesConsulta = require('../utilidades/ConsultaCategoriaLibro.json')

function seleccionarCategorias() {

    //el concepto de promesas
    return new Promise((resolve, reject) => {
        conexion.query(propertiesConsulta.SelectCategoria, (err, resultado) => {
            if (err) reject(err)
            else resolve(resultado)
        });
    });
}

function seleccionarPorCategoria(idCategoria) {
    return new Promise((resolve, reject) => {
        conexion.query(propertiesConsulta.SelectCategoriaPodId, [idCategoria], (err, resultado) => {
            if (err) reject(err)
            else resolve(resultado)
        })
    })
}

//metodo para agregar categorias

function agregarCategoria(nombre, estado) {
    return new Promise((resolve, reject) => {
        conexion.query(propertiesConsulta.InsertarCategoria, [nombre, estado], (err, resultado) => {
            if (err) reject(err)
            else resolve(resultado)
        })
    })

}

//actualizar categoria

function actualizarCategoria(nombre, estado, idCategoria) {

    return new Promise((resolve, reject) => {
        conexion.query(propertiesConsulta.updateCategoria, [nombre, estado, idCategoria], (err, resultado) => {
            if (err) reject(err)
            else resolve(resultado)
        })
    })

}
module.exports = {
    seleccionarCategorias: seleccionarCategorias,
    seleccionarPorCategoria: seleccionarPorCategoria,
    agregarCategoria: agregarCategoria,
    actualizarCategoria:actualizarCategoria
}