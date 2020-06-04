// Comando para conexion

var socket = io();

var label = $('#lblNuevoTicket')

//ON es para escuchar conexión
socket.on('connect', function() {

    console.log('Conectado al servidor');
});


socket.on('disconnect', function() {


    console.log('Se perdio la conexion con el servidor');


});

socket.on('estadoActual', function(resp) {

    console.log(resp);
    label.text(resp.actual)
});

// on 'estadoActual'

$('button').on('click', function() {

    socket.emit('siguienteTicket', null, function(nuevoTicket) {

        label.text(nuevoTicket);

    });

});



// // Emits son para enviar información
// socket.emit('enviarMensaje', {
//     usuario: 'Ricardo',
//     mensaje: 'Hola mundo'

// }, function(resp) {
//     console.log('Respuesta server:', resp);

// });

// //Escuchar informacion 

// socket.on('enviarMensaje', function(mensaje) {

//     console.log('Servidor:', mensaje);

// });