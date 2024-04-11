import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import { Category } from "./category-types";
import { CategoryService } from "./category-service";
import { Logger } from "winston";

export class CategoryController {
    constructor(
        private categoryService: CategoryService,
        private logger: Logger,
    ) {
        this.create = this.create.bind(this);
        this.index = this.index.bind(this);
        this.update = this.update.bind(this);
        this.getCategory = this.getCategory.bind(this);
        this.destroy = this.destroy.bind(this);
    }
    async create(req: Request, res: Response, next: NextFunction) {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            return next(createHttpError(400, result.array()[0].msg as string));
        }

        const { name, priceConfiguration, attributes } = req.body as Category;
        const category = await this.categoryService.create({
            name,
            priceConfiguration,
            attributes,
        });

        this.logger.info(`Created category`, { id: category._id });

        res.json({ id: category._id });
    }
    async index(req: Request, res: Response) {
        const categories = await this.categoryService.getAll();
        this.logger.info(`Getting categories list`);
        res.json(categories);
    }
    async getCategory(req: Request, res: Response, next: NextFunction) {
        const { categoryId } = req.params;

        const category = await this.categoryService.getCategory(categoryId);

        if (!category) {
            return next(createHttpError(404, "Category not found"));
        }
        this.logger.info(`Getting category`);
        res.json(category);
    }
    async update(req: Request, res: Response, next: NextFunction) {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return next(createHttpError(400, result.array()[0].msg as string));
        }

        const { categoryId } = req.params;

        const { name, priceConfiguration, attributes } = req.body as Category;

        await this.categoryService.updateCategory(categoryId, {
            name,
            priceConfiguration,
            attributes,
        });

        this.logger.info(`updated category`, { id: categoryId });

        res.json({ id: categoryId });
    }

    async destroy(req: Request, res: Response) {
        const { categoryId } = req.params;

        await this.categoryService.delete(categoryId);
        this.logger.info(`delete category`, { id: categoryId });

        res.json({ id: categoryId });
    }
}
