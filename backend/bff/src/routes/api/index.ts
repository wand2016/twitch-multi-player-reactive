import express from "express";
import subscriptions from "@bff/routes/api/subscriptions";
import streamers from "@bff/routes/api/streamers";

const router = express.Router();

router.use("/streamers", streamers);
router.use("/subscriptions", subscriptions);

export default router;
