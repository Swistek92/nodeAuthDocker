"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const categorySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    active: {
        default: true,
        require: true,
        type: Boolean,
    },
    nestedCategories: {
        require: false,
        type: [String],
    },
    description: {
        require: false,
        type: String,
    },
});
const CategoryModel = mongoose_1.default.model("Category", categorySchema);
exports.default = CategoryModel;
