import express from "express";
import { getAllmodels, addModel } from "../router_handler/model";

const router = express.Router();

router.get("/allModel", getAllmodels);
router.post("/addModel", addModel);

// 将路由对象共享出去
export default router;
