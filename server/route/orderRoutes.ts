import { Router } from "express";
import { createOrders, getOrders } from "../controller/orderController";


const router = Router();

router.post("/", createOrders);
router.get("/", getOrders);

export default router;