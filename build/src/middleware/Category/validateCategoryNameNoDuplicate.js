"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("../../utils/http");
const http_2 = require("../../utils/http");
const category_service_1 = require("../../service/category.service");
const validateCategoryNameNoDuplicate = async (req, res, next) => {
    try {
        const isDuplicated = await (0, category_service_1.findCategory)({ name: req.body.name });
        if (isDuplicated) {
            return res
                .status(409)
                .json(new http_2.SerializeResponse(409, "Error", "name is allready exist in db"));
        }
    }
    catch (error) {
        return (0, http_1.unhandleError)(error, res);
    }
    next();
};
exports.default = validateCategoryNameNoDuplicate;
