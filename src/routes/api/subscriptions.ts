import express, { Request } from "express";
import { callback, listSubscriptions, subscribe } from "@/subscriptions";

const router = express.Router();

type SubscribeRequestParams = {
  channels: string[];
};

router.get("/", async (req, res) => {
  const channels = await listSubscriptions();
  res.send({
    data: channels,
  });
});
router.post(
  "/",
  async (req: Request<any, any, SubscribeRequestParams>, res) => {
    console.log(req.body);
    const result = await subscribe(req.body.channels ?? []);
    console.log(result, "result of subscribe (sync)");

    res.send("sub ok");
  }
);

router.post("/callback", async (req, res) => {
  console.log("callback is called");
  const challenge = await callback(req.body);

  res.header("Content-Type", "text/plain;charset=utf-8");
  res.send(challenge);
});

export default router;
