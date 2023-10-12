import { ProductsRepository } from "@/repositories/products-repository";
import { Product } from "@prisma/client";

/**
 * Represents the response format of the GetProductsUseCase.
 */
interface GetProductsUseCaseResponse {
  products: Product[];
}

/**
 * Use case for retrieving a list of products along with their technical details.
 */
export class GetProductsUseCase {
  /**
   * Creates an instance of GetProductsUseCase.
   *
   * @param {ProductsRepository} productsRepository - The repository for accessing product data.
   */
  constructor(private productsRepository: ProductsRepository) { }

  /**
   * Executes the use case to retrieve a list of products along with their technical details.
   *
   * @returns {Promise<GetProductsUseCaseResponse>} A promise that resolves to an object containing the list of products.
   */
  async execute(): Promise<GetProductsUseCaseResponse> {
    // Retrieve all products
    const products = await this.productsRepository.findAll();

    // Loop through products and fetch and attach technical details for each
    for (const product of products) {
      const technicalDetails = await this.productsRepository.getAllTechnicalDetailsByProdId(product.id);
      product.TechnicalDetail = technicalDetails;
    }

    return {
      products,
    };
  }
}
