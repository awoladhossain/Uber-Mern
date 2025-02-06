import express from "express";
import { body } from "express-validator";
import {
    getUserProfile,
    loginUser,
    registerUser,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post(
    "/register",
    [
        body("email").isEmail().withMessage("Please enter a valid email"),
        body("fullName.firstName")
            .isLength({ min: 3 })
            .withMessage("First name must be at least 3 characters long"),
        body("fullName.lastName")
            .isLength({ min: 3 })
            .withMessage("Last name must be at least 3 characters long"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters long"),
    ],
    registerUser
);

router.post(
    "/login",
    [
        body("email").isEmail().withMessage("Please enter a valid email"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters long"),
    ],
    loginUser
);

router.get("/profile", authMiddleware, getUserProfile);

export default router;
