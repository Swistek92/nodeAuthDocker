"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRouteJustForUser = void 0;
const http_1 = require("../../utils/http");
const http_2 = require("../../utils/http");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateRouteJustForUser = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            return res
                .status(401)
                .json(new http_2.SerializeResponse(401, "Error", "no token, login in"));
        }
        const token = jsonwebtoken_1.default.verify(accessToken, `${process.env.ACESS_TOKEN_PRIVATE}`, { algorithms: ["RS256"] });
        if (!token) {
            return res
                .status(401)
                .json(new http_2.SerializeResponse(401, "Error", "no token valid token, login in"));
        }
    }
    catch (error) {
        return (0, http_1.unhandleError)(error, res);
    }
    next();
};
exports.validateRouteJustForUser = validateRouteJustForUser;
