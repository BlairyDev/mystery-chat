const express = require ('express');
const http = require('http').createServer();
const io = require('socket.io')(http, {
    cors: {
        origin: "*"
    },
})

const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello Blair');
});

app.get(':id/messages', (req, res) => {
    
});

io.on('connection', (socket) => {
    console.log("New client connected");

    socket.on('message', (data) => {
        console.log('Received message: ', data);
        io.emit('message', data);
    })

    socket.on("disconnect", () => {
        console.log("Client disconnected")
    })
});

http.listen(port, () => {
    console.log(`app listening on port ${port}`)
});