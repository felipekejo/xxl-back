import { stripe } from "@/lib/stripe";
import { OrdersRepository } from "../orders-repository";

export class StripeOrdersRepository implements OrdersRepository {
  async findAll() {
    // const response = await stripe.charges.search({
    //   query: 'status: "succeeded"',
    // });

    // const orders = response.data.map((order) => {
    //   return {
    //     id: order.id,
    //     amount: order.amount,
    //     email: order.billing_details.email,
    //     created: order.created,
    //     customer: order.customer,
    //     balance_transaction: order.balance_transaction,
    //   };
    // });
    const response = await stripe.checkout.sessions.list();

    const orders = response.data.map((order) => {

      return {
        id: order.id,
        amount: order.amount,
        email: order.billing_details.email,
        created: order.created,
        customer: order.customer,
        balance_transaction: order.balance_transaction,
        products: order.metadata.items,
      };
    });

    return orders;
  }

  async findAllByEmail(email: string) {
    return [];
  }

  async findById(id: string) {
    return null;
  }
}
