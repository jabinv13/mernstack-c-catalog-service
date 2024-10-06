import { Request } from "express";
import mongoose from "mongoose";

export interface Product {
    _id?: mongoose.Types.ObjectId;
    name: string;
    description: string;
    priceConfiguration: string;
    attributes: string;
    tenantId: string;
    categoryId: string;
    image: string;
}
export interface ProductData {
    _id?: mongoose.Types.ObjectId;
    name: string;
    description: string;
    priceConfiguration: string;
    attributes: string;
    tenantId: string;
    categoryId: string;
    isPublish: boolean;
    image: string;
}

export interface UpdateProductData {
    name: string;
    description: string;
    priceConfiguration: string;
    attributes: string;
    tenantId: string;
    categoryId: string;
    isPublish: boolean;
    image: string | null;
}

export interface CreateProductRequest extends Request {
    body: ProductData;
}
export interface UpdateProductRequest extends Request {
    body: UpdateProductData;
}

export interface Filter {
    tenantId?: string;
    categoryId?: mongoose.Types.ObjectId;
    isPublish?: boolean;
}

export interface PaginateQuery {
    page: number;
    limit: number;
}
