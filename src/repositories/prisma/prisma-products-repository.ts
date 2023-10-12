import { Prisma, TechnicalDetail } from "@prisma/client";
import { ProductsRepository } from "../products-repository";
import { prisma } from "@/lib/prisma";

/**
 * A repository implementation using Prisma for managing products.
 */
export class PrismaProductsRepository implements ProductsRepository {
  /**
   * Retrieves all products.
   * @returns A promise that resolves to an array of products.
   */
  async findAll() {
    const products = await prisma.product.findMany();
    return products;
  }

  /**
   * Retrieves a product by its unique identifier (ID).
   * @param id - The ID of the product to retrieve.
   * @returns A promise that resolves to a product or null if not found.
   */
  async findById(id: string) {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });
    return product;
  }

  /**
   * Creates a new product.
   * @param data - The product data to create.
   * @returns A promise that resolves to the created product.
   */
  async create(data: Prisma.ProductCreateInput) {
    const product = await prisma.product.create({
      data,
    });
    return product;
  }

  /**
   * Updates a product's information.
   * @param id - The ID of the product to update.
   * @param data - The updated product data.
   * @returns A promise that resolves to the updated product.
   */
  async update(id: string, data: Prisma.ProductUpdateInput) {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data,
    });

    return updatedProduct; // Return the updated product
  }

  /**
   * Deletes a product by its unique identifier (ID).
   * @param id - The ID of the product to delete.
   */
  async delete(id: string) {
    await prisma.product.delete({
      where: {
        id,
      },
    });
  }

  /**
   * Creates technical details associated with a product.
   * @param productId - The ID of the product to associate the details with.
   * @param data - The technical detail data to create.
   * @returns A promise that resolves to the created technical detail.
   */
  async createTechnicalDetail(
    productId: string,
    data: Prisma.TechnicalDetailCreateWithoutProductInput
  ): Promise<TechnicalDetail> {
    const technicalDetail = await prisma.technicalDetail.create({
      data: {
        ...data,
        product: { connect: { id: productId } },
      },
    });
    return technicalDetail;
  }

  // Inside PrismaProductsRepository class
  async getAllTechnicalDetailsByProdId(
    productId: string
  ): Promise<TechnicalDetail[]> {
    const technicalDetails = await prisma.technicalDetail.findMany({
      where: {
        productId,
      },
    });
    return technicalDetails;
  }
}
