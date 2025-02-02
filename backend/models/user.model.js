import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            firstName: {
                type: String,
                required: true,
                minlength: [3, "Name must be at least 3 characters long"],
            },
            lastName: {
                type: String,
                required: true,
                minlength: [3, "Name must be at least 3 characters long"],
            },
        },
        email: {
            type: String,
            required: true,
            unique: true,
            minlength: [3, "Email must be at least 3 characters long"],
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        socketId: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
};
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model("user", userSchema);

export default userModel;
