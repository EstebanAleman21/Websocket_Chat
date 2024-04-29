const WebSocket = require("ws");
const server = new WebSocket.Server({ port: 3003 });

server.on("connection", (ws) => {
  ws.on("message", (message) => {
    console.log("Received: " + message);
    // Broadcast incoming message to all clients
    server.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    console.log("Lost a client");
  });

  console.log("New client connected");
});
