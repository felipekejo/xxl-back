import { ProductsRepository } from "@/repositories/products-repository";

interface UpdateProductImgUrlsUseCaseRequest {
    productId: string;
    imgUrls: string[];
}

export class UpdateProductImgUrlsUseCase {
    constructor(private productsRepository: ProductsRepository) { }

    async execute({ productId, imgUrls }: UpdateProductImgUrlsUseCaseRequest) {
        // Check if the product exists
        const existingProduct = await this.productsRepository.findById(productId);

        if (!existingProduct) {
            throw new Error("Product not found");
        }

        // Update the img_urls of the product
        const updatedProduct = await this.productsRepository.update(productId, {
            img_urls: imgUrls,
        });

        return updatedProduct;
    }
}
