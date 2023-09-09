"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserAccountNoDuplicate = void 0;
const http_1 = require("../../utils/http");
const http_2 = require("../../utils/http");
const user_service_1 = __importDefault(require("../../service/user.service"));
const validateUserAccountNoDuplicate = async (req, res, next) => {
    try {
        const isDuplicated = await user_service_1.default.findUser({
            account: req.body.account,
        });
        if (isDuplicated) {
            return res
                .status(409)
                .json(new http_2.SerializeResponse(409, "Error", "account with that email or phone allready exist"));
        }
    }
    catch (error) {
        return (0, http_1.unhandleError)(error, res);
    }
    next();
};
exports.validateUserAccountNoDuplicate = validateUserAccountNoDuplicate;
