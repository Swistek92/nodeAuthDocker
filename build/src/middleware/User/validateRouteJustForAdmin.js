"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRouteJustForAdmin = void 0;
const http_1 = require("../../utils/http");
const http_2 = require("../../utils/http");
const user_service_1 = __importDefault(require("../../service/user.service"));
const jsonwebtoken_1 = require("jsonwebtoken");
const validateRouteJustForAdmin = async (req, res, next) => {
    try {
        // req.cookies;
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            return res
                .status(401)
                .json(new http_2.SerializeResponse(401, "Error", "no token, login in"));
        }
        const token = (0, jsonwebtoken_1.verify)(accessToken, `${process.env.ACESS_TOKEN_PRIVATE}`, {
            algorithms: ["RS256"],
        });
        if (!token) {
            return res
                .status(401)
                .json(new http_2.SerializeResponse(401, "Error", "no token valid token, login in"));
        }
        const decoded = (0, jsonwebtoken_1.decode)(accessToken);
        const user = await user_service_1.default.findUser({
            _id: decoded.id,
        });
        if (!user || user.role !== "Admin") {
            return res
                .status(401)
                .json(new http_2.SerializeResponse(401, "Error", "you are not a Admin"));
        }
    }
    catch (error) {
        return (0, http_1.unhandleError)(error, res);
    }
    next();
};
exports.validateRouteJustForAdmin = validateRouteJustForAdmin;
