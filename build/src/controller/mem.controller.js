"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mem_service_1 = require("../service/mem.service");
const http_1 = require("../utils/http");
const memCtrl = {
    addMem: async (req, res, next) => {
        try {
            const newMem = await (0, mem_service_1.addMem)(req.body);
            return res
                .status(201)
                .json(new http_1.SerializeResponse(201, "Ok", "Created", newMem));
        }
        catch (error) {
            return (0, http_1.unhandleError)(error, res);
        }
    },
};
exports.default = memCtrl;
