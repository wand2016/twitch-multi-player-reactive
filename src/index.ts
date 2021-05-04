import dotenv from "dotenv";
dotenv.config();

import express from "express";

import api from "@/routes/api";
import expressWs from "express-ws";
import bootstrap from "@/bootstrap";

const { app } = expressWs(express());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/api", api);

app.ws("/ws", async (ws, _req) => {
  await bootstrap(ws);
});

app.listen(3000);
