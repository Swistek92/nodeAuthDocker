"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MemSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        require: true,
        unique: true,
    },
    author: {
        type: String,
        require: true,
        unique: false,
    },
    active: {
        default: true,
        require: true,
        type: Boolean,
    },
    categories: {
        require: true,
        type: [String],
    },
    description: {
        require: false,
        type: String,
    },
});
const MemModel = mongoose_1.default.model("Mem", MemSchema);
exports.default = MemModel;
