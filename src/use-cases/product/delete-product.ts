import { ProductsRepository } from "@/repositories/products-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { ProductsPaymentAPIRepository } from "@/repositories/products-payment-API-repository";

interface DeleteProductsUseCaseRequest {
  productId: string;
}

/**
 * Handles the use case of deleting a product.
 */
export class DeleteProductsUseCase {
  /**
   * Initializes an instance of DeleteProductsUseCase.
   * @param productsRepository - The repository to interact with products data.
   */
  constructor(
    private productsRepository: ProductsRepository,
    private productsPaymentAPIRepository: ProductsPaymentAPIRepository
  ) {}

  /**
   * Executes the use case for deleting a product.
   * @param request - The request containing the product ID to delete.
   * @throws ResourceNotFoundError if the product with the given ID does not exist.
   */
  async execute({ productId }: DeleteProductsUseCaseRequest) {
    const prodExists = await this.productsRepository.findById(productId);

    if (!prodExists) {
      throw new ResourceNotFoundError();
    }
    // await this.productsPaymentAPIRepository.delete(prodExists.stripeId);
    await this.productsRepository.delete(productId);
  }
}
