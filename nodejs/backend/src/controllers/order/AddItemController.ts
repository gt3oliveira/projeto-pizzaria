import { Request, Response } from "express";
import AddItemService from "../../services/order/AddItemService";

export default class AddItemController{
    async handle(req:Request, res:Response){        
        const addItem = new AddItemService();
        const order = await addItem.execute(req.body)

        return res.json(order);
    }
}