import { Router } from "express";
import {addCart,getAllCart,getSingleCart,updateCart,calculateCart,deleteAllCart,deleteSingleCart} from "../controllers/cart.controller";

const router = Router();

// _____________________________________ ROUTES __________________________________
router.get("/cart",getAllCart);
router.get("/cart/read/:id",getSingleCart);
router.post("/cart/create",addCart);
router.patch("/cart/update/:id",updateCart);
router.get("/cart/summary",calculateCart);
router.delete("/cart/deleteall",deleteAllCart);
router.delete("/cart/delete/:id",deleteSingleCart);

export = router;