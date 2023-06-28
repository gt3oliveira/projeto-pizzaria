import prismaClient from "../../prisma";

interface ProductRequest {
    name: string,
    price: string,
    description: string,
    banner: string,
    category_id: string,
}

export default class CreateProductService {
    async execute({ ...productRequest }: ProductRequest) {
        const product = await prismaClient.product.create({
            data:{
                name: productRequest.name,
                price: productRequest.price,
                description: productRequest.description,
                banner: productRequest.banner,
                category_id: productRequest.category_id,
            }
        })

        return product;

    }
}