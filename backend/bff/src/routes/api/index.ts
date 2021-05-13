import express from "express";
import streamers from "./streamers";
import monitoring from "./monitoring";

const router = express.Router();

router.use("/streamers", streamers);
router.use("/streamers/:streamerId/monitoring", monitoring);

export default router;
