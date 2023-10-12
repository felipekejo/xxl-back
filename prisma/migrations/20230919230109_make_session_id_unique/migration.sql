/*
  Warnings:

  - A unique constraint covering the columns `[sessionId]` on the table `orders` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "orders_sessionId_key" ON "orders"("sessionId");
