"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbUrl = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("./logger"));
exports.dbUrl = process.env.DATABASE;
const url = "mongodb+srv://swistek_92:p2e!N&[%CYDk'F;<fRP!KK,QcI2]9Fpa.U][O@cluster0.13vko.mongodb.net/?retryWrites=true&w=majority";
async function connectDb() {
    try {
        // mongoose.set("strictQuery", false);
        if (!exports.dbUrl)
            new Error("no dburl");
        logger_1.default.info(exports.dbUrl);
        await mongoose_1.default.connect(exports.dbUrl);
        logger_1.default.info("db connected");
    }
    catch (error) {
        logger_1.default.error(error);
        logger_1.default.error("cold not connect to db", error);
        process.exit(1);
    }
}
exports.default = connectDb;
