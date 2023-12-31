import { Request, Response } from "express";
import ListCategoryService from "../../services/category/ListCategoryService";

export default class ListCategoryController{
    async handle(req:Request, res:Response){
        const listCategory = new ListCategoryService();
        const category = await listCategory.execute();

        return res.json(category);
    }
}