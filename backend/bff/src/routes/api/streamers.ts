import express, { Request } from "express";
import { components, paths } from "@lib/types/schema-mine";
import { findStreamersByLoginNames } from "@bff/services/streamer";

const router = express.Router();

router.get(
  "/",
  async (
    req: Request<
      any,
      any,
      any,
      paths["/streamers"]["get"]["parameters"]["query"]
    >,
    res
  ) => {
    const streamers = await findStreamersByLoginNames(req.query.name ?? []);

    const responseBody: components["schemas"]["StreamerList"] = {
      data: streamers,
    };
    res.send(responseBody);
  }
);

export default router;
