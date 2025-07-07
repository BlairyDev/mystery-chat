const express = require ('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db/queries');

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "*"
    },
})


const msg = []
const getMsgs = () => Array.from(msg).reverse();



app.get('/', (req, res) => {
    res.send('Hello Blair');
});

app.post('/api/register', async (req, res) => {

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    await db.signUpUser(req.body.username, req.body.email, hashedPassword);
});

app.post('/api/login', async (req, res) => {
 
    try {

        
        const user = await db.getUser(req.body.email);

        if(!user) {
            return res.status(401).json({error: 'Invalid credentials'});
        }
        
        const passwordMatch = await bcrypt.compare(req.body.password, user[0].password);
        
        if(!passwordMatch) {
            return res.status(401).json({error: 'Invalid credentials'});
        }

        const token = jwt.sign({ email: user[0].username }, 'secret');

        console.log(token);

        res.status(200).json({ token })

    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }

    
});

io.on('connection', (socket) => {
    console.log("New client connected");

    socket.emit("msg:get", { msg: getMsgs() })

    socket.on('msg:post', (data) => {
        msg.push({
            user: data.user,
            text: data.text,
            time: Date.now()
        });
        console.log(data.text);
        console.log(msg[0].user);
        io.emit("msg:get", { msg: getMsgs()});
    })

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    })
});




http.listen(port, () => {
    console.log(`app listening on port ${port}`);
});


