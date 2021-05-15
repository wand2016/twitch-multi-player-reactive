import express from "express";
import { components } from "@lib/types/schema-mine";

const router = express.Router();

router.get("/", async (req, res) => {
  const responseBody: components["schemas"]["Config"] = {
    pusher: {
      key: process.env.PUSHER_KEY ?? "",
      appId: process.env.PUSHER_APP_ID ?? "",
      cluster: process.env.PUSHER_CLUSTER ?? "",
      channel: process.env.PUSHER_CHANNEL ?? "",
      event: process.env.PUSHER_EVENT ?? "",
    },
  };
  res.send(responseBody);
});

export default router;
