import { Router } from "express";
import { getAllProducts } from "../controllers/products.controler";


const router = Router();

// __________________________ PRODUCTS ROUTES _______________________
router.get("/products",getAllProducts);


export = router;