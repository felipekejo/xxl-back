import { Prisma, Product, TechnicalDetail } from "@prisma/client";

/**
 * Repository interface for products.
 */
export interface ProductsRepository {
  /**
   * Retrieve all products.
   * @returns A promise that resolves to an array of products.
   */
  findAll(): Promise<Product[]>;

  /**
   * Retrieve a product by its unique identifier (ID).
   * @param id - The ID of the product to retrieve.
   * @returns A promise that resolves to a product or null if not found.
   */
  findById(id: string): Promise<Product | null>;

  /**
   * Create a new product.
   * @param data - The product data to create.
   * @returns A promise that resolves to the created product.
   */
  create(data: Prisma.ProductCreateInput): Promise<Product>;

  /**
   * Create technical details for a product.
   * @param productId - The ID of the product to associate the details with.
   * @param data - The technical detail data to create.
   * @returns A promise that resolves to the created technical detail.
   */
  createTechnicalDetail(
    productId: string,
    data: Prisma.TechnicalDetailCreateWithoutProductInput
  ): Promise<TechnicalDetail>;

  /**
   * Retrieve all technical details for a product by its ID.
   * @param productId - The ID of the product to retrieve technical details for.
   * @returns A promise that resolves to an array of technical details.
   */
  getAllTechnicalDetailsByProdId(productId: string): Promise<TechnicalDetail[]>;

  /**
   * Update a product's information.
   * @param id - The ID of the product to update.
   * @param data - The updated product data.
   * @returns A promise that resolves to the updated product.
   */
  update(id: string, data: Prisma.ProductUpdateInput): Promise<Product>;

  /**
   * Delete a product by its unique identifier (ID).
   * @param id - The ID of the product to delete.
   * @returns A promise that resolves when the product is deleted.
   */
  delete(id: string): Promise<void>;
}
