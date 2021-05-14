import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import api from "@bff/routes/api";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", api);

// for debug
import { unmonitorAll } from "@bff/services/monitoring";

(async () => {
  await unmonitorAll();
  console.log("unmonitored all subs");
})();

app.listen(3000);
