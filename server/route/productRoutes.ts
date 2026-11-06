import { Router } from "express";
import { createProducts, getProducts } from "../controller/productController";


const router = Router();

router.post("/", createProducts);
router.get("/", getProducts);

export default router;