console.log("CONECTADO");

const socket = io();

// TIENE QUE COINCIDIR EL PRIMER PARAMETRO CON EL PRIMERO DEL BACK
socket.on("connection", () => {
  console.log("YOU ARE CONNECTED");
});
