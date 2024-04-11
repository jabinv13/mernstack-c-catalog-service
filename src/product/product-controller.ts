import { NextFunction, Response } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import { ProductService } from "./product-service";
import { CreateProductRequest, ProductData } from "./product-types";

export class ProductController {
    constructor(private productService: ProductService) {}
    create = async (
        req: CreateProductRequest,
        res: Response,
        next: NextFunction,
    ) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return next(createHttpError(400, result.array()[0].msg as string));
        }

        const {
            name,
            description,
            priceConfiguration,
            attributes,
            tenantId,
            categoryId,
            isPublish,
        } = req.body;

        const product = {
            name,
            description,
            priceConfiguration: JSON.parse(priceConfiguration) as string,
            attributes: JSON.parse(attributes) as string,
            tenantId,
            categoryId,
            isPublish,
            image: "image.jpg",
        };

        const newProduct = await this.productService.createProduct(
            product as ProductData,
        );

        res.json({ id: newProduct._id });
    };
}
