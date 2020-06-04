var socket = io();



var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('taquilla')) {
    window.location = 'index.html';
    throw new Error('La taquilla es necesario');
}

var taquilla = searchParams.get('taquilla');
var label = $('small');

console.log(taquilla);
$('h1').text('Taquilla ' + taquilla);

$('button').on('click', function() {

    socket.emit('atenderTicket', { taquilla: taquilla }, function(resp) {
        console.log(resp);
        if (resp === 'No hay tickets') {
            label.text(resp);
            alert(resp);
            return;
        } else {
            label.text('Numero ' + resp.numero)
        }
    });


});