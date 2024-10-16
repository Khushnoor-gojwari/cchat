require('dotenv').config();
const http=require("http");
const express =require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app=express();
const port= process.env.PORT   || 4500;


const users=[{}];

const frontendUrl = process.env.CLIENT_URL || 'https://cchat-f.vercel.app/chat';
app.use(cors({
    origin: frontendUrl,
}));

app.get("/",(req,res)=>{
    res.send("HELL Server is  WORKING");
})

const server=http.createServer(app);

const io=socketIO(server);

io.on("connection",(socket)=>{
    console.log("New Connection");

    socket.on('joined',({user})=>{
          users[socket.id]=user;
          console.log(`${user} has joined `);
          socket.broadcast.emit('userJoined',{user:"Admin",message:` ${users[socket.id]} has joined`});
          socket.emit('welcome',{user:"Admin",message:`Welcome to the chat,${users[socket.id]} `})
    })

    socket.on('message',({message,id})=>{
        io.emit('sendMessage',{user:users[id],message,id});
    })

    socket.on('disconnect',()=>{
          socket.broadcast.emit('leave',{user:"Admin",message:`${users[socket.id]}  has left`});
        console.log(`user left`);
    })
});
// Listen on the port
server.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});

server.listen(port,()=>{
    console.log(`Working`);
})
