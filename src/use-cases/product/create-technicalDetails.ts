import { ProductsRepository } from "@/repositories/products-repository";

interface TechnicalDetailCreateInput {
  detailName: string;
  detailValue: string;
  productId: string;
}

export class CreateTechnicalDetailUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(technicalDetails: TechnicalDetailCreateInput) {
    const data = {
      detailName: technicalDetails.detailName,
      detailValue: technicalDetails.detailValue,
    };

    const technicalDetail = await this.productsRepository.createTechnicalDetail(
      technicalDetails.productId,
      data
    );

    return technicalDetail;
  }
}
