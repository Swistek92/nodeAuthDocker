"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorySchemas = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: "Name is required",
        }),
    }),
};
const params = {
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({
            required_error: "id is required",
        }),
    }),
};
exports.categorySchemas = {
    create: (0, zod_1.object)({
        ...payload,
    }),
    delete: (0, zod_1.object)({
        ...params,
    }),
    update: (0, zod_1.object)({
        ...payload,
        ...params,
    }),
};
