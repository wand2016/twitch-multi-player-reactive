import dotenv from "dotenv";
dotenv.config();

import express from "express";

import api from "@/routes/api";
import expressWs from "express-ws";

const { app } = expressWs(express());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/api", api);

app.ws("/ws", (ws, _req) => {
  ws.on("message", (msg) => {
    console.log(msg);
    ws.send(`reply to ${msg}`);
  });
});

app.listen(3000);
