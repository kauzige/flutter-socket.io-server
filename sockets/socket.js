const { io } = require("../index");

// * Mensajes de Sockets
/// [client] : una computadora o dispositivo que se conecto a mi socket server
io.on("connection", (client) => {
  console.log("Cliente conectado");

  client.on("disconnect", () => {
    /* Cuando se desconecte */
    console.log("Cliente desconectado");
  });

  client.on("mensaje", (payload) => {
    console.log("mensaje!!!", payload);

    io.emit("mensaje", { admin: "Nuevo mensaje " });
  });
});
