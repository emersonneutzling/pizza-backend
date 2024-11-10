import prismaClient from "../../prisma";

interface ProductRequest{
    name: string,
    price: string,
    description: string,
    banner: string,
    category_id: string,

}

class CreateProductService{
    async execute({name, price, banner, description, category_id}: ProductRequest){

        const createProduct = await prismaClient.product.create({
            data:{
                name: name,
                price: price,
                banner: banner,
                description: description,
                category_id: category_id
            }
        });

        return createProduct;
    }
}

export { CreateProductService }