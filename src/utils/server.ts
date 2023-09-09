import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import { UserRouter, MemRouter, CategoryRouter } from "../Routes";

function createServer() {
  const app: Express = express();
  //body parser
  app.enable("trust proxy");
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
  app.use(morgan("dev"));
  app.use(cookieParser());
  app.get("/api/", (req: Request, res: Response) => {
    res.status(200).json("asdasdasd12321312s1111222");
  });

  app.use("/api", UserRouter);
  app.use("/api", MemRouter);
  app.use("/api", CategoryRouter);
  return app;
}

export default createServer;
