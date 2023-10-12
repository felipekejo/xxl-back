/*
  Warnings:

  - Added the required column `product_name` to the `item_lines` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "item_lines" ADD COLUMN     "product_name" TEXT NOT NULL;
