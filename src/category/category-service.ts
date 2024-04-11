import CategoryModel from "./category-model";
import { Category } from "./category-types";

export class CategoryService {
    async create(category: Category) {
        const newCategory = new CategoryModel(category);
        return newCategory.save();
    }

    async getAll() {
        return CategoryModel.find();
    }

    async updateCategory(categorytId: string, category: Category) {
        return (await CategoryModel.findOneAndUpdate(
            { _id: categorytId },
            {
                $set: category,
            },
            {
                new: true,
            },
        )) as Category;
    }

    async getCategory(categoryId: string): Promise<Category | null> {
        return await CategoryModel.findOne({ _id: categoryId });
    }

    async delete(categoryId: string): Promise<Category | null> {
        return await CategoryModel.findByIdAndDelete({ _id: categoryId });
    }
}
