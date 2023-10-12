import { StripeCheckOutRepository } from "@/repositories/stripe/stripe-checkout-repository";
import { GetProductsCheckoutUseCase } from "@/use-cases/order/get-products-checkout";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getCheckoutProducts(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getCheckoutProductsParamsSchema = z.object({
    id: z.string(),
  });

  const id = getCheckoutProductsParamsSchema.parse(request.params);

  const checkOutRepository = new StripeCheckOutRepository();

  const getCheckoutProducts = new GetProductsCheckoutUseCase(
    checkOutRepository
  );

  const products = await getCheckoutProducts.execute(id);

  return reply.status(200).send({
    ...products,
    customerId: request.user.sub,
  });
}
