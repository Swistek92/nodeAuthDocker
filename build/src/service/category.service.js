"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.findAndUpdateCategory = exports.findCategory = exports.getAllCategory = exports.addCategory = void 0;
const category_model_1 = __importDefault(require("../models/category.model"));
async function addCategory(category) {
    return category_model_1.default.create(category);
}
exports.addCategory = addCategory;
async function getAllCategory() {
    return category_model_1.default.find();
}
exports.getAllCategory = getAllCategory;
async function findCategory(query) {
    return category_model_1.default.findOne(query);
}
exports.findCategory = findCategory;
async function findAndUpdateCategory(query, update, options) {
    return category_model_1.default.findOneAndUpdate(query, update, options);
}
exports.findAndUpdateCategory = findAndUpdateCategory;
async function deleteCategory(query) {
    return category_model_1.default.deleteOne(query);
}
exports.deleteCategory = deleteCategory;
