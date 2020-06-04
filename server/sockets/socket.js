const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();


io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {

        let nuevoTicket = ticketControl.siguiente();

        console.log(nuevoTicket);
        callback(nuevoTicket);

    });

    //Emitir un evento 'estadoACtual'

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });


    client.on('atenderTicket', (data, callback) => {

        if (!data.taquilla) {

            return callback({
                err: true,
                message: 'No fue asignado la taquilla'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.taquilla);

        callback(atenderTicket);

        // emitir 'ultimos4'
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });
    });




});