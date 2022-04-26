import express from "express";
import { getuserinfo, changeDefuatModel } from "../router_handler/userinfo";

const router = express.Router();

router.get("/userinfo", getuserinfo);
router.post("/usermodel", changeDefuatModel);

export default router;
