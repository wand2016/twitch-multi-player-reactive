import express, { Request } from "express";
import { findUserIdsByUserNames } from "@/users";
import { findChannelsByUserLoginNames } from "@/channels";
import { listSubscriptions } from "@/subscriptions";

const router = express.Router();

type Params = {
  names: string[];
};

router.get("/", async (req: Request<any, any, any, Params>, res) => {
  const channels = await listSubscriptions();
  res.send({
    data: channels,
  });
});

export default router;
