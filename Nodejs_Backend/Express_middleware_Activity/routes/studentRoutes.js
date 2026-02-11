import { Router } from "express";
const router = Router();
import studentValidator from "../middleware/studentValidator.js";
router.post("/", studentValidator ,(req,res)=>{
    res.json({
        success : true,
        message : " Student data accepted",
        data : req.body
    });
});
router.get("/error" , (req,res)=>{
    throw new Error("Unexpected Failure")
});
export default router;