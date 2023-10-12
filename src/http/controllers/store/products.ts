// import { PrismaProductsRepository } from "@/repositories/prisma/prisma-products-repository";
// import { StripeProductsRepository } from "@/repositories/stripe/stripe-products-repository";
// //import { CreateProductsUseCase } from "@/use-cases/create-products";
// //import { DeleteProductsUseCase } from "@/use-cases/delete-product";
// import { GetProductUseCase } from "@/use-cases/product/get-product";
// import { GetProductsUseCase } from "@/use-cases/product/get-products";
// // import { UpdateProductsUseCase } from "@/use-cases/update-product";
// // import { SearchProductsUseCase } from "@/use-cases/search-products";
// import { FastifyReply, FastifyRequest } from "fastify";
// import { z } from "zod";

// // Get list of products
// export async function list(request: FastifyRequest, reply: FastifyReply) {
//   // Create a new instance of the StripeProductsRepository
//   const productsRepository = new PrismaProductsRepository();
//   // Create a new instance of the GetProductsUseCase, passing in the products repository
//   const getProducts = new GetProductsUseCase(productsRepository);
//   // Call the GetProductsUseCase to get the products data
//   const { products } = await getProducts.execute();

//   // Send the formatted products data to the front-end
//   return reply.status(200).send({ products });
// }

// Get details of a specific product
// export async function get(request: FastifyRequest, reply: FastifyReply) {
//   // Define the expected shape of the request parameters using the zod library
//   const productParamsSchema = z.object({
//     id: z.string(),
//   });
//   // Parse the ID parameter from the request
//   const { id } = productParamsSchema.parse(request.params); // Parse the ID parameter from the request

//   // Create a new instance of the StripeProductsRepository
//   const productsRepository = new PrismaProductsRepository();
//   // Create a new instance of the GetProductUseCase, passing in the products repository
//   const getProduct = new GetProductUseCase(productsRepository);
//   // Call the GetProductUseCase to get the product data
//   const { product } = await getProduct.execute({ productId: id });
//   // Send the formatted product data to the front-end
//   return reply.status(200).send({ product });
// }

// export async function create(request: FastifyRequest, reply: FastifyReply) {
//   const productParamsSchema = z.object({
//     name: z.string(),
//     imageUrl: z.array(z.string()),
//     battery: z.string(),
//     brand: z.string(),
//     price: z.number(),
//     internalStorage: z.string(),
//     modelYear: z.string(),
//     operationalSystem: z.string(),
//     ram: z.string(),
//     screenSize: z.string(),
//   });
//   const {
//     name,
//     imageUrl,
//     battery,
//     brand,
//     price,
//     internalStorage,
//     modelYear,
//     operationalSystem,
//     ram,
//     screenSize,
//   } = productParamsSchema.parse(request.body);

//   const productsRepository = new PrismaProductsRepository();
//   const stripeProductsRepository = new StripeProductsRepository();

//   const createProduct = new CreateProductsUseCase(
//     stripeProductsRepository,
//     productsRepository
//   );

//   await createProduct.execute({
//     name,
//     imageUrl,
//     battery,
//     brand,
//     price,
//     internalStorage,
//     modelYear,
//     operationalSystem,
//     ram,
//     screenSize,
//   });
//   return reply.status(200).send();
// }

// export async function search(request: FastifyRequest, reply: FastifyReply) {
//   // Define the expected shape of the request parameters using the zod library
//   const productParamsSchema = z.object({
//     unitLabel: z.string(),
//   });
//   // Parse the label parameter from the request
//   const { unitLabel } = productParamsSchema.parse(request.params); // Parse the ID parameter from the request
//   // Create a new instance of the StripeProductsRepository
//   const productsRepository = new StripeProductsRepository();
//   // Create a new instance of the GetProductUseCase, passing in the products repository
//   const searchProducts = new SearchProductsUseCase(productsRepository);
//   // Call the GetProductUseCase to get the product data
//   const { products } = await searchProducts.execute({ unitLabel });

//   // Send the formatted products data to the front-end
//   return reply.status(200).send({ products });
// }
