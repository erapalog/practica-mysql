$(function () {
	'use strict';


	$('.form-control').on('input', function () {
		var $field = $(this).closest('.form-group');
		if (this.value) {
			$field.addClass('field--not-empty');
		} else {
			$field.removeClass('field--not-empty');
		}
	});



	$('#iniciarSesion').click(function () {

		let usuario = $('#username').val();
		let clave = $('#password').val();

		$.ajax("http://localhost:3000/api/login", {

			type: "post",
			datatype: 'json',
			contentType: 'application/json',
			data: JSON.stringify({
				usuario: usuario,
				clave: clave
			}),
			success: function (data, status) {
				//guardar en la sesion actual
				sessionStorage.setItem('token', data.mensaje);

				location.href = "main.html"

			},
			error: function (jqXhr, textStatus, erroMensaje) {
				console.log(jqXhr)
				if (jqXhr.status == 400) {
					alert('Usuario no existe en el sistema')
				} else {
					alert('Ocurrio un error')
				}
			}
		})

	});


	$('#cargarProductos').click(function () {

		let token = sessionStorage.getItem('token');
		let opcion = $('#listaOpciones').val()

		$.ajax("http://localhost:3000/api/consultar-productos/" + opcion, {

			type: "get",
			datatype: 'json',
			contentType: 'application/json',
			headers: {
				authorization: 'Bearer ' + token
			},
			success: function (data, status) {
				$('#listaProductos').html('');
				$('#respuesta').html('')

				$('#respuesta').text(data.mensaje)

				for (let i of data.data)
					$('#listaProductos').append('<li>' + i.descripcion + '</li>')

			},
			error: function (jqXhr, textStatus, erroMensaje) {
				console.log(jqXhr)
				if (jqXhr.status == 400) {
					alert('Usuario no existe en el sistema')
				} else {
					alert('Ocurrio un error')
				}
			}
		})

	})

});