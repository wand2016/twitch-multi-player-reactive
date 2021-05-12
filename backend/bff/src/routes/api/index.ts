import express from "express";
import channels from "./channels";
import subscriptions from "@bff/routes/api/subscriptions";

const router = express.Router();

router.use("/channels", channels);
router.use("/subscriptions", subscriptions);

export default router;
