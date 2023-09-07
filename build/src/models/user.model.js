"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "plase add your name"],
        trim: true,
        maxLength: [20, "you name is up to 20chars long"],
    },
    account: {
        type: String,
        require: [true, "please add your email or phone"],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        require: [true, "please add your password"],
        trim: true,
    },
    role: {
        type: String,
        enum: ["User", "Admin"],
        deflaut: "User", //admin
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/dftyei6oe/image/upload/v1672864895/Projekt_bez_tytu%C5%82u_bxirno.jpg",
    },
    type: {
        type: String,
        enum: ["Register", "Login"],
        default: "Register",
    },
}, {
    timestamps: true,
});
const UserModel = mongoose_1.default.model("User", userSchema);
exports.default = UserModel;
