const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;

    // HTTP SERVER
    this.server = http.createServer(this.app);

    // config socket.io
     this.io = socketio(this.server);
  }

  middlewares() {
    // DESPLEGAR DIRECTORIO PUBLIC
    this.app.use(express.static(path.resolve(__dirname, "../public")));
  }

  configureSockets() {
    new Sockets(this.io);
  }

  execute() {
    //    EJECUTA MIDDLEWARES
    this.middlewares();

    //    EJECUTA SOCKETS
    this.configureSockets();

    // EJECUTAR SERVIDOR
    this.server.listen(this.port, () => {
      console.log("listening on ", this.port);
    });
  }
}

module.exports = Server;
