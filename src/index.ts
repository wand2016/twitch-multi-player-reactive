import dotenv from "dotenv";
dotenv.config();

import express from "express";
import api from "@/routes/api";

import { deleteSubscriptions } from "@/subscriptions";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/api", api);

// for debug
(async () => {
  await deleteSubscriptions();
  console.log("deleted all subs");
})();

app.listen(3000);
