// const cors = require('cors');
// const express = require('express');
// const http = require('http');
// const app = express();
// app.use(cors());
// const server = http.createServer(app);
// // app.use((function(req, res, next) {
// //     res.header('Access-Control-Allow-Origin', '*');
// //     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
// //     next();
// // }));
// const socket = require('socket.io');
// const io = socket(server, {
//     // allowRequest: (req, cb) => {
//     //     const isAllowed = req.headers.origin === 'https://modest-hoover-a49330.netlify.app/';
//     //     cb(null, isAllowed);
//     // },
//     cors: {
//         origin: '*',
//         methods: ['GET', 'POST', 'OPTIONS'],
//         handlePreflightRequest: (req, res) => {
//             res.writeHead(200, {
//                 'Access-Control-Allow-Origin': '*',
//                 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
//                 'Access-Control-Allow-Headers': 'my-custom-header',
//                 'Access-Control-Allow-Credentials': true
//             });
//             res.end();
//         }
//     },
    
    

// });

// app.get('/', (req, res) => {
//     res.send({ response: 'I am alive' }).status(200);
  

// });

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
        // methods: ['GET', 'POST', 'OPTIONS'],
        // allowedHeaders: ['Origin', 'Content-Type', 'X-Auth-Token'],
        // credentials: true
    }
});

app.use(express.json());
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

app.get('/hello', (req, res) => {
    res.send('hello');
});
http.listen(PORT, () => console.log(`server is running on ${PORT} `));

    //     methods: ['GET', 'POST', 'OPTIONS'],
    //     allowedHeaders: ['req-header'],
    //     credentials: true
    // }