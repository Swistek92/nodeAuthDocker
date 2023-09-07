"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMemSchema = exports.deleteMemSchema = exports.createMemSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        title: (0, zod_1.string)({
            required_error: "Name is required",
        }),
        image: (0, zod_1.string)({
            required_error: "image is required",
        }),
        author: (0, zod_1.string)({
            required_error: "author is required",
        }),
        active: (0, zod_1.boolean)({
            required_error: "active is required",
        }),
        categories: (0, zod_1.string)().array().nonempty({
            message: "can't be empty",
        }),
    }),
    description: (0, zod_1.string)({
        required_error: "description is required",
    }),
};
const params = {
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({
            required_error: "id is required",
        }),
    }),
};
exports.createMemSchema = (0, zod_1.object)({
    ...payload,
});
exports.deleteMemSchema = (0, zod_1.object)({
    ...params,
});
exports.updateMemSchema = (0, zod_1.object)({
    ...payload,
    ...params,
});
