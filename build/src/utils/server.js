"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const Routes_1 = require("../Routes");
function createServer() {
    const app = (0, express_1.default)();
    //body parser
    app.enable("trust proxy");
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use((0, cors_1.default)());
    app.use((0, morgan_1.default)("dev"));
    app.use((0, cookie_parser_1.default)());
    app.get("/api/", (req, res) => {
        res.status(200).json("v122");
    });
    app.use("/api", Routes_1.UserRouter);
    app.use("/api", Routes_1.MemRouter);
    app.use("/api", Routes_1.CategoryRouter);
    return app;
}
exports.default = createServer;
