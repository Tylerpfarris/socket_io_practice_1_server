const cors = require('cors');
const express = require('express');
const http = require('http');
const app = express();
app.use(cors());
const server = http.createServer(app);
// app.use((function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// }));
const socket = require('socket.io');
const io = socket(server, {
    cors: {
        origin: ['http://localhost:7891', 'https://localhost:7891', 'https://4b8f2dfd9dc5.ngrok.io', 'http://4b8f2dfd9dc5.ngrok.io'],
    },
    credentials: true,
});
// app.get('/', (req, res) => {
//     res.send({ response: 'I am alive' }).status(200);
  

// });


// let interval;
let clients = 0;
io.on('connection', (socket) => {
    console.log('New client connected:' + socket.id);

    // clients++;
    // socket.emit('broadcast', { description: clients + ' clients connected!' });
  
    socket.on('transmit mouse', (data) =>{
        console.log(data);
        socket.broadcast.emit('mouse response', data);
    });
  
    socket.on('disconnect', () => {
        console.log('Client disconnected');
        clients--;
        socket.emit('broadcast', { description: clients + ' clients connected!' });

    });
});


server.listen(8000, () => console.log('server is running on port 8000'));