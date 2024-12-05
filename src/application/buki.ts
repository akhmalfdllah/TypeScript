import express from "express";
import { publicRouter } from "../route/public-api";
import { errorMiddleware } from "../middleware/error-middleware";
import { apiRouter } from "../route/api";


export const buki = express();
buki.use(express.json());
buki.use(publicRouter);
buki.use(apiRouter);
buki.use(errorMiddleware);