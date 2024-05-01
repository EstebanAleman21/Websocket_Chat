const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let guestNumber = 1; // Counter to assign guest numbers

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  let guestName = `Guest ${guestNumber++}`;
  console.log(`${guestName} connected`);

  socket.on("chat message", (msg) => {
    io.emit("chat message", { text: msg, name: guestName });
  });

  socket.on("disconnect", () => {
    console.log(`${guestName} disconnected`);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
