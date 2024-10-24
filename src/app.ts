import express, { Request, Response } from "express";
import { globalErrorHandler } from "./common/middlewares/globalErrorHandler";
import categoryRouter from "./category/category-router";
import productRouter from "./product/product-router";
import toppingRouter from "./topping/topping-router";
import cookieParser from "cookie-parser";
import cors from "cors";
import config from "config";
const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "hello from catalog service" });
});

// app.use(
//     cors({
//         //todo:move to .env file
//         origin: ["http://localhost:5173"],
//         credentials: true,
//     }),
// );

const ALLOWED_DOMAINS = [
    config.get("frontend.clientUI"),
    config.get("frontend.adminUI"),
];

app.use(
    cors({
        //todo:move to .env file
        origin: ALLOWED_DOMAINS as string[],
        credentials: true,
    }),
);

app.use("/categories", categoryRouter);
app.use("/products", productRouter);
app.use("/toppings", toppingRouter);

app.use(globalErrorHandler);

export default app;
