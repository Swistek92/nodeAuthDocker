"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unhandleError = exports.SerializeResponse = void 0;
const logger_1 = __importDefault(require("./logger"));
class SerializeResponse {
    statusCode;
    status;
    message;
    data;
    constructor(statusCode, status, message, data) {
        this.statusCode = statusCode;
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
exports.SerializeResponse = SerializeResponse;
const unhandleError = (error, res) => {
    logger_1.default.error(error);
    return res
        .status(404)
        .json(new SerializeResponse(404, "Error", "Something went wrong...", error));
};
exports.unhandleError = unhandleError;
