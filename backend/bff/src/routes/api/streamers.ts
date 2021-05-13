import express, { Request } from "express";
import { components, paths } from "@lib/types/schema-mine";
import { findStreamersByLoginNames } from "@bff/services/streamer";
import { monitorStreamer } from "@bff/services/monitoring";

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

router.put(
  "/:streamerId/monitoring",
  async (
    req: Request<
      paths["/streamers/{streamerId}/monitoring"]["put"]["parameters"]["path"]
    >,
    res
  ) => {
    await monitorStreamer(req.params.streamerId);
    res.send("sub ok");
  }
);

export default router;
