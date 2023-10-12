/*
  Warnings:

  - Added the required column `priceId` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripeId` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "priceId" TEXT NOT NULL,
ADD COLUMN     "stripeId" TEXT NOT NULL;
