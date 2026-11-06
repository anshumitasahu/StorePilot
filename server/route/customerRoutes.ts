import { Router } from "express";
import { createCustomers, getCustomers } from "../controller/customerController";


const router = Router();

router.post("/", createCustomers);
router.get("/", getCustomers);

export default router;