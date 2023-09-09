"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("../utils/http");
// import { sendRegistrationEmail } from "../utils/sendEmail";
// import { sendRegistrationSms } from "../utils/sendSMS";
const zod_1 = require("zod");
const user_service_1 = __importDefault(require("../service/user.service"));
const authTokenGenerator_1 = __importDefault(require("../utils/authTokenGenerator"));
const CLIENT_URL = `${process.env.BASE_URL}`;
const userCtrl = {
    register: async ({ name, password, account, SendRegistrationEmail, SendRegistrationSms, ActiveTokenGenerator, HashPassword, }) => {
        const passwordHash = await HashPassword(password, 12);
        const newUser = { name, account, password: passwordHash };
        const activeToken = ActiveTokenGenerator({ newUser });
        const url = `${CLIENT_URL}/active/${activeToken}`;
        const emailValiadtor = zod_1.z.string().email();
        const parseEmail = emailValiadtor.safeParse(account);
        if (parseEmail.success && typeof account === "string") {
            try {
                const msg = "verify you email addres";
                if (process.env.test) {
                    return new http_1.SerializeResponse(200, "Ok", msg, activeToken);
                }
                else {
                    await SendRegistrationEmail(account, url, msg);
                    return new http_1.SerializeResponse(200, "Ok", msg);
                }
            }
            catch (error) {
                return new http_1.SerializeResponse(400, "Error", error.message || "smonthing went wrong");
            }
        }
        else {
            try {
                const msg = "verify you phone number";
                if (process.env.test) {
                    return new http_1.SerializeResponse(200, "Ok", msg, activeToken);
                }
                else {
                    // await SendRegistrationSms(`${account}`, url, msg);
                    return new http_1.SerializeResponse(200, "Ok", msg);
                }
            }
            catch (error) {
                return new http_1.SerializeResponse(400, "Error", error.message || "smonthing went wrong");
            }
        }
    },
    activeAccount: async ({ activeToken, decodeToken, }) => {
        try {
            const decoded = decodeToken(activeToken, `${process.env.ACTIVE_TOKEN_PRIVATE}`, { algorithms: ["RS256"] });
            const { newUser } = decoded;
            if (!newUser) {
                return new http_1.SerializeResponse(500, "Error", "invalid authentication, remember you have just 15min to active your account!");
            }
            // catch a try register with diffrent role
            newUser.role = "User";
            const user = await user_service_1.default.addUser(newUser);
            return new http_1.SerializeResponse(201, "Ok", "sucess! acocunt activated and created, you can login", user);
        }
        catch (error) {
            return new http_1.SerializeResponse(500, "Error", error.message ||
                "invalid authentication, remember you have just 15min to active your account!");
        }
    },
    getAll: async () => {
        try {
            const users = await user_service_1.default.getAllUsers();
            return new http_1.SerializeResponse(200, "Ok", "sucess! your users", users);
        }
        catch (error) {
            return new http_1.SerializeResponse(400, "Error", "smth went wrong");
        }
    },
    login: async ({ password, user, comparePassword }) => {
        try {
            const isMatch = await comparePassword(password, user.password);
            if (!isMatch) {
                return new http_1.SerializeResponse(400, "Error", "Bad password");
            }
            let ReturnUser = user;
            ReturnUser.password = undefined;
            return new http_1.SerializeResponse(200, "Ok", "you are login", {
                ...ReturnUser._doc,
            });
        }
        catch (error) {
            return new http_1.SerializeResponse(400, "Error", error.message || "smth went wrong with login");
        }
    },
    refreshToken: async ({ token, validateToken }) => {
        try {
            const decoded = validateToken(token, `${process.env.REFRESH_TOKEN_PRIVATE}`, { algorithms: ["RS256"] });
            if (!decoded) {
                return new http_1.SerializeResponse(400, "Error", "invalid token");
            }
            const user = await user_service_1.default.findUser({ _id: decoded.id }, "-password");
            if (!user) {
                return new http_1.SerializeResponse(400, "Error", "can not find a user");
            }
            const accessToken = authTokenGenerator_1.default.Access({ id: user._id });
            return new http_1.SerializeResponse(200, "Ok", "new access token", {
                accessToken,
            });
        }
        catch (error) {
            return new http_1.SerializeResponse(400, "Error", error.message || "smth went wrong with login");
        }
    },
};
exports.default = userCtrl;
