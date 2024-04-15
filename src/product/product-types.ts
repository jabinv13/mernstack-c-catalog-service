import { Request } from "express";

export interface Product {
    name: string;
    description: string;
    priceConfiguration: string;
    attributes: string;
    tenantId: string;
    categoryId: string;
    image: string;
}
export interface ProductData {
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
