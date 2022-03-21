const { io } = require("../index");
const Band = require("../models/band");
const Bands = require("../models/bands");

const bands = new Bands();

bands.addBand(new Band("AC/DC"));
bands.addBand(new Band("Bon Jovi"));
bands.addBand(new Band("Aerosmith"));
bands.addBand(new Band("Green Day"));

console.log(bands);

// * Mensajes de Sockets
/// [client] : una computadora o dispositivo que se conecto a mi socket server
io.on("connection", (client) => {
  console.log("Cliente conectado");

  client.emit("active-bands", bands.getBands());

  client.on("disconnect", () => {
    /* Cuando se desconecte */
    console.log("Cliente desconectado");
  });

  client.on("mensaje", (payload) => {
    console.log("mensaje!!!", payload);

    io.emit("mensaje", { admin: "Nuevo mensaje " });
  });

  // client.on("emitir-mensaje", (payload) => {
  //   // console.log(payload);
  //   // io.emit("nuevo-mensaje", payload); // emite a todos !
  //   client.broadcast.emit("nuevo-mensaje", payload); // emite a todos menos al que lo emitio
  // });

  client.on("vote-band", (payload) => {
    bands.voteBand(payload.id);
    io.emit("active-bands", bands.getBands());
  });

  // Escuchar add-band
  client.on("add-band", (payload) => {
    bands.addBand(new Band(payload.name));
    io.emit("active-bands", bands.getBands());
  });

  // Borrar
  client.on("delete-band", (payload) => {
    bands.deleteBand(payload.id);
    io.emit("active-bands", bands.getBands());
  });
});
