//Get, POST,PUT, Delete


var configuraciones = config;

function consultarCategorias() {

    $('#listaCategorias').html('')
    $('#categorias').html('')

    $.ajax(configuraciones.hostApi + configuraciones.selectcategorias, {
        type: "GET",
        datatype: 'Json',
        //data:
        success: function (data, status) {

            let listaCategorias = data;

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

function guardarCategoria(descripcionInput) {
    $.ajax(configuraciones.hostApi + configuraciones.insertarCategoria, {

        type: "post",
        datatype: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            descripcion: descripcionInput
        }),
        success: function (data, status) {
            $('#mensaje').append('<p>Se agrego correctamente</p>');
            consultarCategorias()

        },
        error: function (jqXhr, textStatus, erroMensaje) {
            console.log(jqXhr)
            if (jqXhr.responseJSON.status == 400) {
                $('#mensaje').append('<p>' + jqXhr.responseJSON.mensaje + '</p>');
            } else {
                $('#mensaje').append('Ocurrio un erro');
            }
        }
    })

}

$('#guardarCategoria').click(function () {

    let descripcion = $('#descripcionCategoria').val();
    guardarCategoria(descripcion);
})
consultarCategorias();

//DOM 