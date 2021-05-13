import express, { Request } from "express";
import { subscribe } from "@bff/subscriptions";

const router = express.Router();

type SubscribeRequestParams = {
  channels: string[];
};

router.post(
  "/",
  async (req: Request<any, any, SubscribeRequestParams>, res) => {
    await subscribe(req.body.channels ?? []);
    res.send("sub ok");
  }
);

export default router;
