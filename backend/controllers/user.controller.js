import { validationResult } from "express-validator";
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
const loginUser = async (req, res) => {};

export { loginUser, registerUser };
