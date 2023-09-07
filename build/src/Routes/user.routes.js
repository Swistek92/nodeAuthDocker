"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_schema_1 = require("./../schema/user.schema");
const express_1 = __importDefault(require("express"));
const validateResource_1 = __importDefault(require("../middleware/validateResource"));
const User_1 = require("../middleware/User");
const sendEmail_1 = require("../utils/sendEmail");
const sendSMS_1 = require("../utils/sendSMS");
const http_1 = require("../utils/http");
const authTokenGenerator_1 = __importDefault(require("../utils/authTokenGenerator"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_controlller_1 = __importDefault(require("../controller/user.controlller"));
exports.UserRouter = express_1.default.Router();
exports.UserRouter.post("/user/register", [(0, validateResource_1.default)(user_schema_1.userSchemas.create), User_1.validateUserAccountNoDuplicate], async (req, res) => {
    const { name, password, account } = req.body;
    try {
        const response = await user_controlller_1.default.register({
            name,
            password,
            account,
            SendRegistrationEmail: sendEmail_1.SendRegistrationEmail,
            SendRegistrationSms: sendSMS_1.SendRegistrationSms,
            ActiveTokenGenerator: authTokenGenerator_1.default.Active,
            HashPassword: bcrypt_1.default.hash,
        });
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        (0, http_1.unhandleError)(error, res);
    }
});
exports.UserRouter.post("/user/active", async (req, res) => {
    const { activeToken } = req.body;
    if (!activeToken) {
        return res
            .status(400)
            .json(new http_1.SerializeResponse(400, "Error", "no activeToken!"));
    }
    try {
        const response = await user_controlller_1.default.activeAccount({
            activeToken,
            decodeToken: jsonwebtoken_1.default.verify,
        });
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        (0, http_1.unhandleError)(error, res);
    }
});
// router.post("/user/login", [validateUserAccountIsExist], userCtrl.login);
exports.UserRouter.post("/user/login", [User_1.validateUserAccountIsExist], async (req, res) => {
    const { password, user } = req.body;
    const comparePassword = bcrypt_1.default.compare;
    const accessToken = authTokenGenerator_1.default.Access({ id: user._id });
    const refreshToken = authTokenGenerator_1.default.Refresh({ id: user._id });
    try {
        const response = await user_controlller_1.default.login({
            password,
            user,
            comparePassword,
        });
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000, // 15min
        });
        res.cookie("refreshtoken", refreshToken, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        (0, http_1.unhandleError)(error, res);
    }
});
//validate exist user for test during development
exports.UserRouter.get("/user/logout", (req, res) => {
    try {
        res.clearCookie("refreshtoken");
        res.clearCookie("accessToken");
        return res.status(200).json(new http_1.SerializeResponse(200, "Ok", "logout"));
    }
    catch (error) {
        (0, http_1.unhandleError)(error, res);
    }
});
exports.UserRouter.get("/user/refreshToken", async (req, res) => {
    const token = req.cookies.refreshtoken;
    if (!token) {
        return res
            .status(404)
            .json(new http_1.SerializeResponse(400, "Error", "no token"));
    }
    try {
        const response = await user_controlller_1.default.refreshToken({
            token,
            validateToken: jsonwebtoken_1.default.verify,
        });
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        (0, http_1.unhandleError)(error, res);
    }
});
exports.UserRouter.get("/user/getAll", [User_1.validateRouteJustForAdmin], async (req, res) => {
    try {
        const response = await user_controlller_1.default.getAll();
        return res.status(response.statusCode).json(response);
    }
    catch (error) {
        (0, http_1.unhandleError)(error, res);
    }
});
exports.UserRouter.get("/user/justForUserTest", [User_1.validateRouteJustForUser], async (req, res) => {
    res.status(200).json("ok");
});
