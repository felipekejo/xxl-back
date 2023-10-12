/*
  Warnings:

  - The primary key for the `orders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `category_name` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `stripeId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `customer_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryAddress` to the `orders` table without a default value. This is not possible if the table is not empty.
  - The required column `orderNo` was added to the `orders` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `total` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discount` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discountTotal` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('Received', 'Sent', 'Delivered');

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_product_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_user_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_category_name_fkey";

-- AlterTable
ALTER TABLE "orders" DROP CONSTRAINT "orders_pkey",
DROP COLUMN "id",
DROP COLUMN "product_id",
DROP COLUMN "user_id",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "customer_id" TEXT NOT NULL,
ADD COLUMN     "deliveryAddress" TEXT NOT NULL,
ADD COLUMN     "orderNo" TEXT NOT NULL,
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'Received',
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL,
ADD CONSTRAINT "orders_pkey" PRIMARY KEY ("orderNo");

-- AlterTable
ALTER TABLE "products" DROP COLUMN "category_name",
DROP COLUMN "stripeId",
ADD COLUMN     "AboutItem" TEXT[],
ADD COLUMN     "briefDescription" TEXT[],
ADD COLUMN     "discount" BOOLEAN NOT NULL,
ADD COLUMN     "discountTotal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "img_urls" TEXT[],
ADD COLUMN     "keyInfo" TEXT[],
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "stock" INTEGER NOT NULL;

-- DropTable
DROP TABLE "categories";

-- CreateTable
CREATE TABLE "technical_details" (
    "id" TEXT NOT NULL,
    "detailName" TEXT NOT NULL,
    "detailValue" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,

    CONSTRAINT "technical_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_lines" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "product_id" TEXT NOT NULL,
    "unitaryPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "item_lines_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "technical_details" ADD CONSTRAINT "technical_details_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_lines" ADD CONSTRAINT "item_lines_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("orderNo") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_lines" ADD CONSTRAINT "item_lines_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
