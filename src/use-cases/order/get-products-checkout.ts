import { CheckOutRepository } from "@/repositories/check-out-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetProductsCheckoutUseCaseRequest {
  id: string;
}

// interface GetProductsCheckoutUseCaseResponse {
//   url: CheckOutSessionURL;
// }

export class GetProductsCheckoutUseCase {
  constructor(private checkOutRepository: CheckOutRepository) {}

  async execute({ id }: GetProductsCheckoutUseCaseRequest) {
    const checkOut = await this.checkOutRepository.getById(id);

    if (!checkOut) {
      throw new ResourceNotFoundError();
    }

    return checkOut;
  }
}
