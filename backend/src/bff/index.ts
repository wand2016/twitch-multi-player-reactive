import express from "express";
import cors from "cors";
import api from "@bff/routes/api";
import serverless from "serverless-http";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", api);

export const handler = serverless(app);
