import express, { Request } from "express";
import { findUserIdsByUserNames } from "@/users";

const router = express.Router();

type Params = {
  names: string[];
};

router.get(
  "/search-by-name",
  async (req: Request<any, any, any, Params>, res) => {
    const ids = await findUserIdsByUserNames(req.query.names ?? []);
    res.send(ids);
  }
);

export default router;
