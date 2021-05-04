import express from "express";
import users from "./users";
import channels from "./channels";

const router = express.Router();

router.use("/users", users);
router.use("/channels", channels);

export default router;
