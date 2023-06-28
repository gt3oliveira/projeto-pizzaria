import { Request, Response } from "express";
import FinishOrderService from "../../services/order/FinishOrderService";

export default class FinishOrderController{
    async handle(req:Request, res:Response){
        const finishOrder = new FinishOrderService();
        const order = await finishOrder.execute(req.body);

        return res.json(order);
    }
}

