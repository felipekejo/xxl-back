import { ProductsRepository } from "@/repositories/products-repository";
import { Product } from "@prisma/client";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";

/**
 * Request interface for the GetProductUseCase.
 */
interface GetProductUseCaseRequest {
  id: string;
}

/**
 * Response interface for the GetProductUseCase.
 */
interface GetProductUseCaseResponse {
  product: Product | null;
}

/**
 * Use case for fetching product details along with associated technical details.
 */
export class GetProductUseCase {
  constructor(private productsRepository: ProductsRepository) { }

  /**
   * Executes the GetProductUseCase.
   * 
   * @param {GetProductUseCaseRequest} request - The request containing the product ID.
   * @returns {Promise<GetProductUseCaseResponse>} A promise containing the product details.
   * @throws {ResourceNotFoundError} Thrown if the requested product is not found.
   */
  async execute({ id }: GetProductUseCaseRequest): Promise<GetProductUseCaseResponse> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new ResourceNotFoundError();
    }

    // Fetch technical details using repository
    const technicalDetails = await this.productsRepository.getAllTechnicalDetailsByProdId(id);

    // Attach technical details to the product
    product.TechnicalDetail = technicalDetails;

    return { product };
  }
}