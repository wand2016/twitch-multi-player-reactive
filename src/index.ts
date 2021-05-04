import express from "express";
import expressWs from "express-ws";

const { app } = expressWs(express());

app.use(express.static("public"));

app.ws("/", function (ws, req) {
  ws.on("message", function (msg) {
    console.log(msg);
    ws.send(`reply to ${msg}`);
  });
});

app.listen(3000);
