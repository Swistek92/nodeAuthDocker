"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const UserService = {
    addUser: async (user) => {
        return user_model_1.default.create(user);
    },
    findUser: async (query, select) => {
        return user_model_1.default.findOne(query).select(select);
    },
    getAllUsers: async () => {
        return user_model_1.default.find();
    },
};
exports.default = UserService;
