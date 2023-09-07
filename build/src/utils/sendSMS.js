"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendRegistrationSms = void 0;
const twilio_1 = require("twilio");
const logger_1 = __importDefault(require("./logger"));
const accountSid = `AC${process.env.TWILIO_ACCOUNT_SID}`;
const authToken = `${process.env.TWILIO_AUTH_TOKEN}`;
const phoneFrom = `${process.env.TWILO_PHONE_NUMBER}`;
// const client = require("twilio")(accountSid, authToken);
const client = new twilio_1.Twilio(accountSid, authToken);
// +13157847889;
const SendRegistrationSms = async (to, body, txt) => {
    try {
        const clinet = await client.messages.create({
            body: `wellcome to mems, ${body} - ${txt}`,
            from: phoneFrom,
            to: `+48${to}`,
        });
    }
    catch (error) {
        logger_1.default.error(error);
        throw new Error(error);
    }
};
exports.SendRegistrationSms = SendRegistrationSms;
