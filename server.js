import net from "node:net";
import fs from "node:fs";



// Can be create like this
// const server = net.createServer();

//  server.on("connection", (socket) => {
//   console.log("client connected", socket.remoteAddress, socket.remotePort);
// })
// server.listen(3000, "127.0.0.1", () => {
//   console.log("listening on", server.address());


const server = net.createServer((socket) => {
  // Crate TCP connection
  // socket(AF_INET, SOCK_STREAM, 0)
  console.log("client connected", socket.remoteAddress, socket.remotePort);

  socket.on("data", (chunk) => {
    if (chunk.length === 0) return;
    chunk = chunk.toString();
    if (chunk === "file:number.txt") {
      socket.write("file:number.txt");

      const file = fs.createReadStream("./number.txt");
      file.pipe(socket);
      return;
    } else {
      console.log("received:", `${chunk} (${chunk.length}bytes)`);
      socket.write(chunk);
    }
  });

  socket.on("close", () => console.log("client disconnected"));

  socket.on("end", () => console.log("client ended"));
  socket.on("error", (err) => console.error("socket error", err));
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error("Port already in use");
  } else {
    throw err;
  }
});

server.listen(3000, "0.0.0.0", 5, () => {
  // Handle Bind + backlog + listen
  console.log("listening on", server.address());
});
