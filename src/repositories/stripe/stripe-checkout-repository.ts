import { stripe } from "@/lib/stripe";
import { CheckOutRepository } from "../check-out-repository";
import { env } from "@/env";
import { ProductCheckOut } from "@/@types/checkout";

export class StripeCheckOutRepository implements CheckOutRepository {
  async getById(id: string) {
    const session = await stripe.checkout.sessions.retrieve(id, {
      expand: ["line_items", "line_items.data.price.product"],
    });

    const products = session.line_items?.data;

    if (!products) {
      return null;
    }

    const checkoutProducts = products.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      price: item.amount_total,
      productName: item.description,
      image: item.price?.product.images[0],
      priceId: item.price?.id,
    }));

    const checkoutSession = {
      total: session.amount_total,
      address: {
        line1: session.customer_details?.address?.line1,
        line2: session.customer_details?.address?.line2,
        city: session.customer_details?.address?.city,
        country: session.customer_details?.address?.country,
        postal_code: session.customer_details?.address?.postal_code,
      },
      checkoutProducts,
      customerId: session.customer,
    };

    return checkoutSession;
  }

  async create(lineItems: ProductCheckOut[]) {
    const checkOutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${env.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.BASE_URL}/cancel`,
      billing_address_collection: "required",
    });

    const checkOutSessionUrl = checkOutSession.url;

    if (!checkOutSessionUrl) {
      return null;
    }

    return checkOutSessionUrl;
  }
}
