import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { PriceStripe, Products, ProductStripe } from "@/@types/products";
import { ProductsPaymentAPIRepository } from "../products-payment-API-repository";

export class StripeProductsRepository implements ProductsPaymentAPIRepository {
  async update(product: Products) {
    await stripe.products.update(product.id, {
      ...product,
      name: product.name,
      images: product.imageUrl,
    });
  }

  async findById(id: string) {
    const product = await stripe.products.retrieve(id, {
      expand: ["default_price"], // Include the default price for the product in the response
    });

    if (!product) {
      return null;
    }

    const price = product.default_price as Stripe.Price;

    // Format the product data as needed for the front-end
    const productInfo = {
      id: product.id,
      name: product.name,
      imageUrl: product.images,
      priceId: price.id,
      price: price.unit_amount === null ? 0 : price.unit_amount / 100, // Format the price as a currency string
    };

    return productInfo;
  }

  async findAll() {
    const response = await stripe.products.list({
      expand: ["data.default_price"], // Include the default price for each product in the response
    });

    // Map the response data to format the data as needed for the front-end
    const products = response.data.map((product) => {
      const price = product.default_price as Stripe.Price;

      return {
        id: product.id,
        name: product.name,
        imageUrl: product.images,
        priceId: price.id,
        price: price.unit_amount === null ? 0 : price.unit_amount / 100,
      };
    });

    return products;
  }

  async create(product: ProductStripe) {
    console.log(product);
    const productStripe = await stripe.products.create({
      name: product.name,
      images: [product.imageUrl],
    });
    console.log(productStripe);
    const price = await stripe.prices.create({
      unit_amount: product.price,
      currency: "aud",
      product: productStripe.id,
    });
    console.log(price);
    return {
      id: productStripe.id,
      priceId: price.id,
    };
  }

  async delete(productId: string) {
    await stripe.products.del(productId);
  }

  async createPrice({ price, productId }: PriceStripe) {
    const createdPrice = await stripe.prices.create({
      unit_amount: price,
      currency: "aud",
      product: productId,
    });

    return { priceId: createdPrice.id };
  }
}
