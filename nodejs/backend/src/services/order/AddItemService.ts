import prismaClient from "../../prisma";

interface ItemRequest{
    order_id: string,
    product_id: string,
    amount: number,
}

export default class AddItemService{
    async execute({ ...itemRequest }: ItemRequest){
        const order = await prismaClient.item.create({
            data:{
                order_id: itemRequest.order_id,
                product_id: itemRequest.product_id,
                amount: itemRequest.amount,
            }
        })

        return order;
        
    }
}