const express = require('express') 
var http = require('http');
var socketIo = require('socket.io');
var path = require('path')
const Sockets = require('./sockets')

class Server {
    constructor (){
        this.app = express();
        this.port =  process.env.PORT;
        
        this.server = http.createServer(this.app)

        this.io = socketIo(this.server)
    }

    middleware(){
        this.app.use('/', express.static(path.resolve(__dirname, '../public')))
        console.log(path.resolve(__dirname, '../public/index.html'))
    }

    socketsConfig(){
        new Sockets(this.io)
    }

    execute(){

        this.middleware()

        this.socketsConfig()

        this.server.listen(this.port, ()=>{
            console.log("server up" + this.port)
        } )
    }
}

module.exports = Server