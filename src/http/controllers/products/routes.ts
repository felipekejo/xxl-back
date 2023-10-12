import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";
import { createProduct } from "../products/createProduct";
import { deleteProduct } from "../products/deleteProduct";
import { updateProduct } from "../products/updateProduct";
import { getProduct } from "../products/getProduct";
import { getAllProducts } from "./getAllProducts";
import { uploadImage } from "./uploadImage";
import { updateProductImgUrls } from "./updateUrls";

export async function productRoutes(app: FastifyInstance) {
  app.get("/products", getAllProducts);
  app.get("/products/:id", getProduct);
  app.post(
    "/products",
    { onRequest: [verifyJWT, verifyUserRole(["ADMIN", "OWNER"])] },
    createProduct
  );
  app.patch<{ Params: { id: string } }>(
    "/products/:id", // Frontend must use PATCH for updating a product
    { onRequest: [verifyJWT, verifyUserRole(["ADMIN", "OWNER"])] },
    updateProduct
  );
  app.delete<{ Params: { id: string } }>(
    "/products/:id", // Frontend must use DELETE for deleting a product
    { onRequest: [verifyJWT, verifyUserRole(["ADMIN", "OWNER"])] },
    deleteProduct
  );

  app.post(
    "/productImages",
    { onRequest: [verifyJWT, verifyUserRole(["ADMIN", "OWNER"])] },
    uploadImage
  );

  // Update product image urls
  app.patch<{ Params: { id: string } }>(
    "/products/:id/update-img-urls",
    { onRequest: [verifyJWT, verifyUserRole(["ADMIN", "OWNER"])] },
    updateProductImgUrls
  );
}
