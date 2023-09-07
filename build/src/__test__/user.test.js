"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/first */
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: "./../../.env.test" });
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../utils/server"));
const app = (0, server_1.default)();
describe("user test", () => {
    beforeAll(async () => {
        const mongoServer = await mongodb_memory_server_1.MongoMemoryServer.create();
        mongoose_1.default.set("strictQuery", false);
        await mongoose_1.default.connect(mongoServer.getUri());
        process.env.test = "test";
    });
    afterAll(async () => {
        process.env.test = undefined;
        await mongoose_1.default.disconnect();
        await mongoose_1.default.connection.close();
    });
    it("test env", () => {
        expect(process.env.test).toBe("test");
    });
    const user = {
        name: "123123123123123",
        account: "swistekxd@gmail.com",
        password: "123123123123123",
    };
    let jwtActiveToken;
    let jwtAcessToken;
    describe("create user", () => {
        it("create user with email  account", async () => {
            const { statusCode, body } = await (0, supertest_1.default)(app)
                .post("/api/user/register")
                .send(user);
            expect(statusCode).toEqual(200);
            jwtActiveToken = body.data;
        });
        it("active user with created jwtActiveToken ", async () => {
            const { statusCode, body } = await (0, supertest_1.default)(app)
                .post("/api/user/active")
                .send({ activeToken: jwtActiveToken });
            const includeName = JSON.stringify(body).includes(user.name);
            const includeAccount = JSON.stringify(body).includes(user.account);
            expect(includeName).toBeTruthy();
            expect(includeAccount).toBeTruthy();
            expect(statusCode).toEqual(201);
        });
    });
    describe("login user", () => {
        it("should login user", async () => {
            const { statusCode, body, headers } = await (0, supertest_1.default)(app)
                .post("/api/user/login")
                .send(user);
            expect(statusCode).toBe(200);
            console.log(headers["set-cookie"][0].split(";")[0].split("=")[1]);
            // const cookies = JSON.parse(header);
            // console.log(cookies);
            // jwtAcessToken = body.data.accessToken;
            jwtAcessToken = headers["set-cookie"][0].split(";")[0].split("=")[1];
        });
    });
    describe("authorization", () => {
        it("should throw unauthorized error if user are not Admin", async () => {
            const { statusCode, body } = await (0, supertest_1.default)(app)
                .get("/api/user/getAll")
                .set("Cookie", `accessToken=${jwtAcessToken}`);
            expect(statusCode).toBe(401);
        });
        it("should return status code 200", async () => {
            const { statusCode, body } = await (0, supertest_1.default)(app)
                .get("/api/user/justForUserTest")
                .set("Cookie", `accessToken=${jwtAcessToken}`);
            expect(statusCode).toBe(200);
        });
    });
});
