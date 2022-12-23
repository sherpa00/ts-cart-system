import { Router } from "express";
import { signup } from "../controllers/signup.controller";

const router = Router();

router.post("/signup",signup);

export = router;