
import {ExpressPeerServer} from 'peer'

import http from "http"
import {Server} from "socket.io"
import express, {json} from "express"
import cors from "cors"
import {
    addUser,
    deleteUser,
    findAllUsers,
    findsingleUser,
    updateUser
} from "./controller/user/users.js";
import {addJob, deleteJob, findAllJobs, updateJob} from "./controller/jobs/jobs.js";
import {
    addEntreprise,
    deleteEntreprise,
    findAllEntreprises,
    updateEntreprise
} from "./controller/entreprise/entreprise.js";
import {addUserSocials, deleteUserSocials, findAllUserSocials, updateUserSocials} from "./controller/user/usersSocials.js";
import {
    addEtudiantDetails,
    deleteEtudiantDetails,
    findAllEtudiant_details,
    updateEtudiantDetails
} from "./controller/user/etudiant_details.js";
import {
    addAdminEntreprise,
    deleteAdminEntreprise,
    findAllAdmin_entreprise, updateAdminEntreprise
} from "./controller/entreprise/admin_entreprise.js";



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
app.get("/user/users",findAllUsers)
app.post("/user/one_user",findsingleUser);
app.post("/user/add",addUser)
app.post("/user/delete",deleteUser)
app.post("/user/update",updateUser)

// user details
app.get("/user/socials/all",findAllUserSocials)
app.post("/user/socials/add",addUserSocials)
app.post("/user/socials/delete",deleteUserSocials)
app.post("/user/socials/update",updateUserSocials)

// Etudiant details
app.get("/user/etudiant/all",findAllEtudiant_details)
app.post("/user/etudiant/add",addEtudiantDetails)
app.post("/user/etudiant/delete",deleteEtudiantDetails)
app.post("/user/etudiant/update",updateEtudiantDetails)

// Admin entreprise
app.get("/user/admin_e/all",findAllAdmin_entreprise)
app.post("/user/admin_e/add",addAdminEntreprise)
app.post("/user/admin_e/delete",deleteAdminEntreprise)
app.post("/user/admin_e/update",updateAdminEntreprise)


// jobs

app.get("/job/jobs",findAllJobs)
app.post("/job/add",addJob)
app.post("/job/delete",deleteJob)
app.post("/job/update",updateJob)

//entreprise

app.get("/entreprise/entreprises",findAllEntreprises)
app.post("/entreprise/add",addEntreprise)
app.post("/entreprise/delete",deleteEntreprise)
app.post("/entreprise/update",updateEntreprise)




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