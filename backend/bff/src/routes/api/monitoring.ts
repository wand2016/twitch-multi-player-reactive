import express, { Request } from "express";
import { paths } from "@lib/types/schema-mine";
import { monitorStreamer } from "@bff/services/monitoring";

const router = express.Router();

router.put(
  "/",
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
