import mongoose from "mongoose";
import logger from "./logger";
import { error } from "console";
export const dbUrl = process.env.DATABASE;

async function connectDb() {
  try {
    // mongoose.set("strictQuery", false);
    if (dbUrl === undefined) {
      return new Error("no dburl");
    }

    await mongoose.connect(dbUrl);
    logger.info("db connected");
  } catch (error) {
    logger.error(error);
    logger.error("cold not connect to db", error);
    process.exit(1);
  }
}

export default connectDb;
