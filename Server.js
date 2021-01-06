
import {ExpressPeerServer} from 'peer'

import http from "http"
import {Server} from "socket.io"
import express, {json} from "express"
import cors from "cors"
import {addUser, findAllUsers} from "./controller/user/users.js";



// create express app
const app = express();
app.use(cors())
app.use(json())
// create peerjs server


// create http server + assign app to it
const server = http.createServer(app);

// create socket server
const io = new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
});




// peers is the pth that the peerjs server will be connected to
const peerServer = ExpressPeerServer(server, {
    debug: true,
    allow_discovery:true

});
app.use("/peerjs",peerServer)

app.get("/hamid",(req, res) =>{
    res.send({name:"hamid"})
})

// find users
app.get("/users",findAllUsers)
app.post("/user",addUser)




// working on peerSErver

let allPeers=[];

peerServer.on('connection',(client => {
    allPeers.push(client.getId());
    console.log(`client connected id: ${client.getId()}`)
    console.log(`=> count of peers:  ${allPeers.length}`);


}))
peerServer.on('disconnect',client =>{
    allPeers=allPeers.filter(id=>id!=client.getId())
})

// GET : get all connected id of peers :Array
app.get("/peers",(req, res) =>{
    res.send({allPeers})
})




//socket.io



io.on("connection", socket =>{
    // socket.emit("hamid", 'hi' );
    // socket.emit('peers',allPeers)
    // console.log("new user connected  ");
    // console.log(io.of("/").sockets.size);
    // io.emit('peerCount1',allPeers)
})



// run the server
const port = process.env.PORT || 5000
// GET : get the port
app.get("/port",(req, res) =>{
    res.send({portIs:port})
})


const run = () =>{
    server.listen(port,() =>{})
    console.log(`server is runnign port ${port}\n`)
}
run();