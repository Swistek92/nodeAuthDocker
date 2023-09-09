"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateResource_1 = __importDefault(require("../middleware/validateResource"));
const validateMongoIdInParams_1 = __importDefault(require("../middleware/validateMongoIdInParams"));
const validateCategoryIsExist_1 = __importDefault(require("../middleware/Category/validateCategoryIsExist"));
const validateCategoryNameNoDuplicate_1 = __importDefault(require("../middleware/Category/validateCategoryNameNoDuplicate"));
const category_schema_1 = require("../schema/category.schema");
const category_controller_1 = __importDefault(require("../controller/category.controller"));
exports.CategoryRouter = express_1.default.Router();
exports.CategoryRouter.post("/category", [(0, validateResource_1.default)(category_schema_1.categorySchemas.create), validateCategoryNameNoDuplicate_1.default], category_controller_1.default.addCategoryHandler);
exports.CategoryRouter.get("/category", category_controller_1.default.getAllCategoryHandler);
exports.CategoryRouter.put("/category/:id", [
    (0, validateResource_1.default)(category_schema_1.categorySchemas.update),
    validateMongoIdInParams_1.default,
    validateCategoryIsExist_1.default,
], category_controller_1.default.updateCategoryHandler);
exports.CategoryRouter.delete("/category/:id", [
    (0, validateResource_1.default)(category_schema_1.categorySchemas.delete),
    validateMongoIdInParams_1.default,
    validateCategoryIsExist_1.default,
], category_controller_1.default.deleteCategoryHandler);
