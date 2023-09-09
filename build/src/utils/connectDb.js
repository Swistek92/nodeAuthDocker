"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbUrl = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("./logger"));
const default_1 = __importDefault(require("../../config/default"));
exports.dbUrl = process.env.DATABASE;
// const dockerMongo = "mongodb://swistek:1234@172.18.0.2:27017/?authSource=admin";
const dockerMongo = `mongodb://${default_1.default.MONGO_USER}:${default_1.default.MONGO_PASSWORD}@${default_1.default.MONGO_IP}:${default_1.default.MONGO_PORT}/?authSource=admin`;
async function connectDb() {
    try {
        mongoose_1.default.set("strictQuery", false);
        if (exports.dbUrl === undefined) {
            return new Error("no dburl");
        }
        await mongoose_1.default.connect(dockerMongo);
        logger_1.default.info("db connected");
    }
    catch (error) {
        logger_1.default.error(error);
        logger_1.default.error("cold not connect to db try again in 5s", error);
        setTimeout(() => {
            connectDb();
        }, 5000);
    }
}
exports.default = connectDb;
