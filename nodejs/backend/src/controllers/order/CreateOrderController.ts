import { Request, Response } from "express";
import CreateOrderService from "../../services/order/CreateOrderService";

export default class CreateOrderController{
    async handle(req:Request, res:Response){        
        const createOrder = new CreateOrderService();
        const order = await createOrder.execute(req.body);

        return res.json(order)
    }
}
