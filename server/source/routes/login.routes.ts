import { Router } from "express";
import { login } from "../controllers/login.controller";

const router = Router();

// ____________________________________ LOGIN ROUTER __________________________________
router.post("/login",login);

export = router;