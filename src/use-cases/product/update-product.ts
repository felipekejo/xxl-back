import { ProductsPaymentAPIRepository } from "@/repositories/products-payment-API-repository";
import { ProductsRepository } from "@/repositories/products-repository";

/**
 * Represents the request format for the UpdateProductUseCase.
 */
interface UpdateProductUseCaseRequest {
  productId: string;
  productData: {
    name?: string;
    price?: number;
    stock?: number;
    discount?: boolean;
    discountTotal?: number;
    stripeId?: string;
    img_urls?: string[];
    briefDescription?: string[];
    keyInfo?: string[];
    AboutItem?: string[];
    technicalDetails?: {
      detailName: string;
      detailValue: string;
    }[];
  };
}

/**
 * Use case for updating a product's information and technical details.
 */
export class UpdateProductUseCase {
  /**
   * Creates an instance of UpdateProductUseCase.
   *
   * @param {ProductsRepository} productsRepository - The repository for accessing product data.
   */
  constructor(
    private productsRepository: ProductsRepository,
    private productsPaymentAPIRepository: ProductsPaymentAPIRepository
  ) {}

  /**
   * Executes the use case to update a product's information and technical details.
   *
   * @param {UpdateProductUseCaseRequest} request - The request containing the product ID and updated data.
   * @returns {Promise<any>} A promise that resolves to the updated product.
   * @throws {Error} Throws an error if the product is not found.
   */
  async execute({ productId, productData }: UpdateProductUseCaseRequest) {
    // Check if the product exists
    const existingProduct = await this.productsRepository.findById(productId);
    if (!existingProduct) {
      throw new Error("Product not found");
    }
    // If technical details are provided, update them as well
    if (productData.technicalDetails) {
      for (const detail of productData.technicalDetails) {
        await this.productsRepository.createTechnicalDetail(productId, detail);
      }
    }
    const productStripe = {
      id: existingProduct.stripeId,
      name: existingProduct.name,
      imageUrl: existingProduct.img_urls,
      price: existingProduct.price,
      priceId: existingProduct.priceId,
    };

    await this.productsPaymentAPIRepository.update(productStripe);
    // Update the product's information
    const updatedProduct = await this.productsRepository.update(
      productId,
      productData
    );

    return updatedProduct;
  }
}
