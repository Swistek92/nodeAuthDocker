"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMem = void 0;
const mem_model_1 = __importDefault(require("../models/mem.model"));
async function addMem(mem) {
    return mem_model_1.default.create(mem);
}
exports.addMem = addMem;
