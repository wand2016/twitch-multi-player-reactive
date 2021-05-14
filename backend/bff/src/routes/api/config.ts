import express from "express";
import { components } from "@lib/types/schema-mine";

const router = express.Router();

router.get("/", async (req, res) => {
  const responseBody: components["schemas"]["Config"] = {
    pusher_key: process.env.PUSHER_KEY ?? "",
  };
  res.send(responseBody);
});

export default router;
