"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("./../utils/http");
const validateResource = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    }
    catch (error) {
        return res
            .status(400)
            .json(new http_1.SerializeResponse(400, "Error", "Invalid_Type", error));
    }
};
exports.default = validateResource;
