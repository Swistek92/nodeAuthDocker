"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateResource_1 = __importDefault(require("../middleware/validateResource"));
const mem_schema_1 = require("../schema/mem.schema");
const mem_controller_1 = __importDefault(require("../controller/mem.controller"));
const saveImageToCloudinary_1 = __importDefault(require("../middleware/saveImageToCloudinary"));
exports.MemRouter = express_1.default.Router();
exports.MemRouter.post("/mem", [(0, validateResource_1.default)(mem_schema_1.createMemSchema), saveImageToCloudinary_1.default], mem_controller_1.default.addMem);
exports.default = exports.MemRouter;
