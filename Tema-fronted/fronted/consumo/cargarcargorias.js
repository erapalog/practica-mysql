//Get, POST,PUT, Delete


var configuraciones = config;

function consultarCategorias() {

    $.ajax(configuraciones.hostApi + configuraciones.selectcategorias, {
        type: "GET",
        datatype: 'Json',
        //data:
        success: function (data, status) {

            let listaCategorias = JSON.parse(JSON.stringify(data));

            for (let i of listaCategorias) {
                $('#listaCategorias').append('<li>' + i.descripcion + '</li>');

                $('#categorias').append('<option id="' + i.idCategoria + '">' + i.descripcion + '</option>>')
            }

        },
        error: function (jqXhr, textStatus, erroMensaje) {
            console.log("Error" + jqXhr)
            console.log("Error detalle" + erroMensaje)
        }
    })
}

consultarCategorias();

//DOM 