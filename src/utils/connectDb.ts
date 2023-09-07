import mongoose from "mongoose";
import logger from "./logger";
import { error } from "console";
export const dbUrl = process.env.DATABASE;
const url =
  "mongodb+srv://swistek_92:GHsFnmfXdT7rC40Y@cluster0.13vko.mongodb.net/?retryWrites=true&w=majority";
async function connectDb() {
  try {
    // mongoose.set("strictQuery", false);
    if (!dbUrl) new Error("no dburl");
    logger.info(dbUrl);
    await mongoose.connect(url);
    logger.info("db connected");
  } catch (error) {
    logger.error(error);
    logger.error("cold not connect to db", error);
    process.exit(1);
  }
}

export default connectDb;
