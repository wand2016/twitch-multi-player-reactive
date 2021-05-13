import express, { Request } from "express";
import { findChannelsByUserLoginNames } from "@bff/gateways/channels";

const router = express.Router();

type Params = {
  names: string[];
};

router.get("/search", async (req: Request<any, any, any, Params>, res) => {
  const channels = await findChannelsByUserLoginNames(req.query.names ?? []);
  res.send({
    data: channels,
  });
});

export default router;
