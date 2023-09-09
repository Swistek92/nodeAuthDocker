"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("../../utils/http");
const http_2 = require("../../utils/http");
const category_service_1 = require("../../service/category.service");
const validateCategoryIsExist = async (req, res, next) => {
    try {
        const category = await (0, category_service_1.findCategory)({ _id: req.params.id });
        if (!category) {
            return res
                .status(422)
                .json(new http_2.SerializeResponse(422, "Error", "category with this Id do not exist"));
        }
    }
    catch (error) {
        return (0, http_1.unhandleError)(error, res);
    }
    next();
};
exports.default = validateCategoryIsExist;
