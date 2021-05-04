import express from "express";
import channels from "./channels";
import subscriptions from "@/routes/api/subscriptions";
import users from "./users";

const router = express.Router();

router.use("/channels", channels);
router.use("/subscriptions", subscriptions);
router.use("/users", users);

export default router;
