import { Router } from "express";
import { getAllJSDocTagsOfKind } from "typescript";
import { getUser,updateUser,updateUserPassword,deleteUser } from "../controllers/user.controller";

const router = Router();

// _______________________________ USER ROUTES _______________________
router.get("/user",getUser);
router.patch("/user/update",updateUser);
router.patch("/user/updatePassword",updateUserPassword);
router.delete("/user/delete",deleteUser);

export = router;