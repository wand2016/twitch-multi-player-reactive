import express from "express";
import { unmonitorAll } from "@bff/services/monitoring";

const router = express.Router();

router.delete("/", async (_req, res) => {
  await unmonitorAll();
  res.sendStatus(204);
});

export default router;
