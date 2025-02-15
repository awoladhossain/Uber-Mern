import express from "express";
import { body } from "express-validator";
import {
    getCaptainProfile,
    loginCaptain,
    logoutCaptain,
    registerCaptain,
} from "../controllers/captain.controller.js";
import { authCaptainMiddleware } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post(
    "/register",
    [
        body("email").isEmail().withMessage("Please enter a valid email"),
        body("fullname.firstname")
            .isLength({ min: 3 })
            .withMessage("First name must be at least 3 characters long"),
        body("fullname.lastname")
            .isLength({ min: 3 })
            .withMessage("Last name must be at least 3 characters long"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters long"),
        body("vehicle.color")
            .isLength({ min: 3 })
            .withMessage("Color must be at least 3 characters long"),
        body("vehicle.plate")
            .isLength({ min: 3 })
            .withMessage("Plate must be at least 3 characters long"),
        body("vehicle.capacity")
            .isNumeric()
            .withMessage("Capacity must be a number"),
        body("vehicle.vehicleType")
            .isIn(["car", "motorcycle", "auto"])
            .withMessage("Vehicle type must be car, motorcycle or auto"),
    ],
    registerCaptain
);

router.post(
    "/login",
    [
        body("email").isEmail().withMessage("Please enter a valid email"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters long"),
    ],
    loginCaptain
);

router.get("/profile", authCaptainMiddleware, getCaptainProfile);
router.get("/logout", authCaptainMiddleware, logoutCaptain);

export default router;
