import { ProductsPaymentAPIRepository } from "@/repositories/products-payment-API-repository";
import { ProductsRepository } from "@/repositories/products-repository";

interface CreateProductUseCaseRequest {
  name: string;
  price: number;
  stock: number;
  discount: boolean;
  discountTotal: number;
  img_urls: string[];
  briefDescription: string;
  keyInfo: string;
  AboutItem: string;
}

export class CreateProductUseCase {
  constructor(
    private productsPaymentAPIRepository: ProductsPaymentAPIRepository,
    private productsRepository: ProductsRepository
  ) {}

  async execute({
    name,
    price,
    stock,
    discount,
    discountTotal,
    img_urls,
    briefDescription,
    keyInfo,
    AboutItem,
  }: CreateProductUseCaseRequest) {
    console.log(name);
    console.log(img_urls);
    console.log(price);

    // Create a product in Stripe
    const productStripe = await this.productsPaymentAPIRepository.create({
      name,
      imageUrl: img_urls[0],
      price: price * 100, // Converting to cents (Stripe uses cents)
    });
    console.log("Executing CreateProductUseCase1");

    // Create a discount price in Stripe if applicable
    const discountStripe = discount
      ? await this.productsPaymentAPIRepository.createPrice({
          price: discountTotal * 100, // Converting to cents
          productId: productStripe.id,
        })
      : null;

    // Prepare data for creating a product in your repository
    const productRepositoryData = {
      name,
      img_urls,
      stock,
      price,
      briefDescription,
      keyInfo,
      AboutItem,
      discount,
      discountTotal,
      priceId: productStripe.priceId,
      stripeId: productStripe.id,
      discountStripeId: discountStripe ? discountStripe.priceId : null,
    };

    // Create a product in your repository
    const product = await this.productsRepository.create(productRepositoryData);

    return product;
  }
}
