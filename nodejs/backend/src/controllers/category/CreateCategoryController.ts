import { Request, Response } from "express";
import CreateCategoryService from "../../services/category/CreateCategoryService";

export default class CreateCategoryController{
    async handle(req:Request, res:Response){
        const createCategory = new CreateCategoryService();
        const category = await createCategory.execute(req.body);

        return res.json(category);
    }
}