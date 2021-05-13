import express from "express";
import streamers from "./streamers";

const router = express.Router();

router.use("/streamers", streamers);

export default router;
