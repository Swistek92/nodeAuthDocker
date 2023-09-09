"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const http_1 = require("../utils/http");
const validateMongoIdInParams = async (req, res, next) => {
    if (!(0, mongoose_1.isValidObjectId)(req.params.id)) {
        return res
            .status(404)
            .json(new http_1.SerializeResponse(404, "Error", "invalid Id"));
    }
    next();
};
exports.default = validateMongoIdInParams;
