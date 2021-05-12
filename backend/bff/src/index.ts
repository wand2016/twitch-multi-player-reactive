import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import api from "@bff/routes/api";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/api", api);

// for debug
import { deleteSubscriptions } from "@bff/subscriptions";
(async () => {
  await deleteSubscriptions();
  console.log("deleted all subs");
})();

app.listen(3000);
