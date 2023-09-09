"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserAccountIsExist = void 0;
const http_1 = require("../../utils/http");
const http_2 = require("../../utils/http");
const user_service_1 = __importDefault(require("../../service/user.service"));
const validateUserAccountIsExist = async (req, res, next) => {
    try {
        const user = await user_service_1.default.findUser({
            account: req.body.account,
        });
        if (!user) {
            return res
                .status(400)
                .json(new http_2.SerializeResponse(400, "Error", "this account do not exist"));
        }
        else {
            req.body.user = user;
        }
    }
    catch (error) {
        return (0, http_1.unhandleError)(error, res);
    }
    next();
};
exports.validateUserAccountIsExist = validateUserAccountIsExist;
