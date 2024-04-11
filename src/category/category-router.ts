import express from "express";
import { CategoryController } from "./category-controller";
import categoryValidator from "./category-validator";
import { CategoryService } from "./category-service";
import logger from "../config/logger";
import { asyncWrapper } from "../common/utils/wrapper";
import authenticate from "../common/middlewares/authenticate";
import { Roles } from "../common/constants";
import { canAccess } from "../common/middlewares/canAccess";

const router = express.Router();

const categorySerivce = new CategoryService();

const categoryController = new CategoryController(categorySerivce, logger);

router.post(
    "/",
    authenticate,
    canAccess([Roles.ADMIN]),
    categoryValidator,
    asyncWrapper(categoryController.create),
);
router.put(
    "/:categoryId",
    authenticate,
    canAccess([Roles.ADMIN]),
    categoryValidator,
    asyncWrapper(categoryController.update),
);

router.get("/", asyncWrapper(categoryController.index));
router.get("/:categoryId", asyncWrapper(categoryController.getCategory));
router.delete("/:categoryId", asyncWrapper(categoryController.destroy));

export default router;
