class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }



  socketEvents() {
    // ON CONNECT
    this.io.on("connection", (socket) => {

      // Listen for new message
      socket.on("new-mensaje", (data) => {
        console.log(data);
        this.io.emit("mensaje-from-server", data);
      });
    });
  }
}

module.exports = Sockets;
