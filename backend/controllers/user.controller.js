import { validationResult } from "express-validator";
import blackListTokenModel from "../models/blacklistToken.model.js";
import userModel from "../models/user.model.js";
import userService from "../services/user.service.js";

const registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { fullName, email, password } = req.body;

    const hashPassword = await userModel.hashPassword(password);
    const user = await userService.createUser({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashPassword,
    });
    const token = user.generateAuthToken();
    res.status(201).json({ token, user });
};
const loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    const isValid = await user.comparePassword(password);
    if (!isValid) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = user.generateAuthToken();
    res.cookie("token", token);
    res.status(200).json({ token, user });
};

const getUserProfile = async (req, res, next) => {
    res.status(200).json({ user: req.user });
};

const logoutUser = async (req, res, next) => {
    res.clearCookie("token");
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    await blackListTokenModel.create({ token });
    res.status(200).json({ message: "Logged out successfully" });
};

export { getUserProfile, loginUser, logoutUser, registerUser };
