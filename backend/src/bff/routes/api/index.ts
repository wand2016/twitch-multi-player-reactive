import express from "express";
import config from "@bff/routes/api/config";
import streamers from "./streamers";
import monitorings from "@bff/routes/api/monitorings";

const router = express.Router();

router.use("/config", config);
router.use("/streamers", streamers);
router.use("/monitorings", monitorings);

export default router;
