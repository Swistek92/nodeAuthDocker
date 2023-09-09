import mongoose from "mongoose";
import logger from "./logger";
import { error } from "console";
import config from "../../config/default";
export const dbUrl = process.env.DATABASE;

// const dockerMongo = "mongodb://swistek:1234@172.18.0.2:27017/?authSource=admin";
const dockerMongo = `mongodb://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_IP}:${config.MONGO_PORT}/?authSource=admin`;

async function connectDb() {
  try {
    mongoose.set("strictQuery", false);
    if (dbUrl === undefined) {
      return new Error("no dburl");
    }

    await mongoose.connect(dockerMongo);
    logger.info("db connected");
  } catch (error) {
    logger.error(error);
    logger.error("cold not connect to db try again in 5s", error);
    setTimeout(() => {
      connectDb();
    }, 5000);
  }
}

export default connectDb;
