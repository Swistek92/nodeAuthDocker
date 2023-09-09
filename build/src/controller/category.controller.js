"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_service_1 = require("../service/category.service");
const http_1 = require("../utils/http");
const categoryCtrl = {
    deleteCategoryHandler: async (req, res) => {
        try {
            const deletedCategory = await (0, category_service_1.deleteCategory)({ _id: req.params.id });
            res
                .status(204)
                .json(new http_1.SerializeResponse(204, "Ok", "Category deleted", deletedCategory));
        }
        catch (error) {
            (0, http_1.unhandleError)(error, res);
        }
    },
    updateCategoryHandler: async (req, res) => {
        const update = req.body;
        try {
            const updateCategory = await (0, category_service_1.findAndUpdateCategory)({ _id: req.params.id }, update, {
                new: true,
            });
            return res
                .status(200)
                .json(new http_1.SerializeResponse(200, "Ok", "Category Updated", updateCategory));
        }
        catch (error) {
            (0, http_1.unhandleError)(error, res);
        }
    },
    addCategoryHandler: async (req, res) => {
        try {
            const newCategory = await (0, category_service_1.addCategory)(req.body);
            return res
                .status(201)
                .json(new http_1.SerializeResponse(201, "Ok", "Created", newCategory));
        }
        catch (error) {
            return (0, http_1.unhandleError)(error, res);
        }
    },
    getAllCategoryHandler: async (req, res) => {
        try {
            const category = await (0, category_service_1.getAllCategory)();
            return res
                .status(200)
                .json(new http_1.SerializeResponse(200, "Ok", "Your Categories", category));
        }
        catch (error) {
            return (0, http_1.unhandleError)(error, res);
        }
    },
};
exports.default = categoryCtrl;
