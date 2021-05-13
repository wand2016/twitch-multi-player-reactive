import express, { Request } from "express";
import { components, paths } from "@lib/types/schema-mine";
import { findStreamersByLoginNames } from "@bff/services/streamer";

const router = express.Router();

type Params = paths["/streamers"]["get"]["parameters"]["query"];

router.get("/search", async (req: Request<any, any, any, Params>, res) => {
  const streamers = await findStreamersByLoginNames(req.query.name ?? []);

  const responseBody: components["schemas"]["StreamerList"] = {
    data: streamers,
  };
  res.send(responseBody);
});

export default router;
