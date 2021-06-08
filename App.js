const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
app.use(require('cors')({
    origin: true,
    credentials: true,
}));
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
    cors: {
        origin: true,
    }
});

app.use(express.json());

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('transmit mouse', (data) =>{
        socket.broadcast.emit('mouse response', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');

    });
});

app.get('/hello', (req, res) => {
    res.send('hello');
});
http.listen(PORT, () => console.log(`server is running on ${PORT} `));
