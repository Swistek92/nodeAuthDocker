"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const { ACTIVE_TOKEN_PRIVATE } = process.env;
const AuthTokenGenerator = {
    Active: (payload) => {
        const sginOptions = {
            algorithm: "RS256",
            expiresIn: "15m",
        };
        return (0, jsonwebtoken_1.sign)(payload, process.env.ACTIVE_TOKEN_PRIVATE, sginOptions);
    },
    Access: (payload) => {
        return (0, jsonwebtoken_1.sign)(payload, process.env.ACESS_TOKEN_PRIVATE, {
            algorithm: "RS256",
            expiresIn: "15m",
        });
    },
    Refresh: (payload) => {
        return (0, jsonwebtoken_1.sign)(payload, process.env.REFRESH_TOKEN_PRIVATE, {
            algorithm: "RS256",
            expiresIn: "30d",
        });
    },
};
exports.default = AuthTokenGenerator;
