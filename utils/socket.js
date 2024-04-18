const { Server } = require("socket.io");

function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    // Emit a message to the client upon connection
    socket.emit("message", "Hello from the server!");

    // Listen for chat messages from clients
    socket.on("chat message", (msg) => {
      io.emit("chat message", msg); // Broadcast the message to all connected clients
    });

    // Listen for client-specific messages
    socket.on("clientMessage", (data) => {
      console.log(data);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
}

module.exports = initializeSocket;
