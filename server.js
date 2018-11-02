const server = require('http').createServer();
const io = require('socket.io')(server, {});

server.listen(5555);

io.on('connect', socket => {
    console.log('client connected');

    socket.on('motion', motionData => {
        console.log(Date.now(), motionData);
    });

});