import prismaClient from "../../prisma";

interface OrderRequest{
    table: number,
    name: string,
}

export default class CreateOrderService{
    async execute({ ...orderRequest }: OrderRequest){
        const order = await prismaClient.order.create({
            data:{
                table: orderRequest.table,
                name: orderRequest.name,
            }
        })

        return order;
        
    }
}