"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchemas = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: "Name is required",
        }).min(4, "min 4 chars long"),
        account: (0, zod_1.string)({
            required_error: "account are required",
        }),
        password: (0, zod_1.string)({
            required_error: "password is required",
        }).min(6, "min length 6 chars long "),
    }),
};
exports.userSchemas = {
    create: (0, zod_1.object)({
        ...payload,
    }),
    // delete: object({
    //   ...params,
    // }),
    // update: object({
    //   ...payload,
    //   ...params,
    // }),
};
