import { Request, Response } from "express";
import SendOrderService from "../../services/order/SendOrderService";

export default class SendOrderController{
    async handle(req:Request, res:Response){
        // const order_id = req.body;
        const sendOrder = new SendOrderService();
        const order = await sendOrder.execute(req.body);

        return res.json(order);
    }
}


