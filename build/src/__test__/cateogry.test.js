"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const category_model_1 = __importDefault(require("../models/category.model"));
const server_1 = __importDefault(require("../utils/server"));
const app = (0, server_1.default)();
const category = {
    name: "Mqq111231qqn",
    active: true,
    nestedCategories: ["T-shirt", "Jacket"],
    description: "Discover the latest trends in men's fashion and style. ",
};
const FailRequestcategory = {
    // name: "Mqq111qqn",
    active: true,
    nestedCategories: ["T-shirt", "Jacket"],
    description: "Discover the latest trends in men's fashion and style. ",
};
describe("category", () => {
    beforeAll(async () => {
        const mongoServer = await mongodb_memory_server_1.MongoMemoryServer.create();
        mongoose_1.default.set("strictQuery", false);
        await mongoose_1.default.connect(mongoServer.getUri());
    });
    afterAll(async () => {
        await mongoose_1.default.disconnect();
        await mongoose_1.default.connection.close();
    });
    describe("create", () => {
        it("should return 201 and category for correct data", async () => {
            const { statusCode, body } = await (0, supertest_1.default)(app)
                .post("/api/category/")
                .send(category);
            expect(statusCode).toBe(201);
            expect(body).toEqual({
                data: {
                    ...category,
                    __v: 0,
                    _id: expect.any(String),
                },
                message: expect.any(String),
                status: "Ok",
                statusCode: 201,
            });
        });
        it("should return 400 if we dont provide a name", async () => {
            const { statusCode, body } = await (0, supertest_1.default)(app)
                .post("/api/category/")
                .send(FailRequestcategory);
            expect(statusCode).toBe(400);
        });
        it("should return 409 for duplicate name", async () => {
            await (0, supertest_1.default)(app).post("/api/category/").send(category);
            const { statusCode } = await (0, supertest_1.default)(app)
                .post("/api/category/")
                .send(category);
            expect(statusCode).toBe(409);
        });
    });
    describe("update", () => {
        beforeAll(() => {
            category_model_1.default.collection.drop();
        });
        it("should return 400 if we dont send name", async () => {
            const { body } = await (0, supertest_1.default)(app)
                .post("/api/category/")
                .send(category);
            const { statusCode } = await (0, supertest_1.default)(app)
                .put(`/api/category/${body.data._id}`)
                .send();
            expect(statusCode).toBe(400);
        });
        it("should return 404 if we send request with invalid mongoose iD", async () => {
            const { statusCode } = await (0, supertest_1.default)(app)
                .put(`/api/category/123123213`)
                .send(category);
            expect(statusCode).toBe(404);
        });
        it("throw 422 if category with this id do not exist", async () => {
            const { statusCode } = await (0, supertest_1.default)(app)
                .put(`/api/category/63ead48efa236fee4f6fd92e`)
                .send(category);
            expect(statusCode).toBe(422);
        });
    });
    describe("delete", () => {
        beforeAll(() => {
            category_model_1.default.collection.drop();
        });
        it("should return 422 if category does exist", async () => {
            const { statusCode } = await (0, supertest_1.default)(app)
                .delete(`/api/category/63ead48efa236fee4f6fd92e`)
                .send(category);
            expect(statusCode).toBe(422);
        });
        it("should retrun 404 if we send request with invalid mongoose iD", async () => {
            const { statusCode } = await (0, supertest_1.default)(app)
                .delete(`/api/category/123123213`)
                .send(category);
            expect(statusCode).toBe(404);
        });
        it("should return 204 if category are deleted", async () => {
            const createdCategory = await (0, supertest_1.default)(app)
                .post("/api/category/")
                .send(category);
            expect(createdCategory.statusCode).toBe(201);
            const { statusCode } = await (0, supertest_1.default)(app).delete(`/api/category/${createdCategory.body.data._id}`);
            expect(statusCode).toBe(204);
        });
    });
});
