-- CreateEnum
CREATE TYPE "PRODUCT_STATE" AS ENUM ('AVAILABLE', 'OUT_OF_STOCK', 'DISABLED');

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "businessId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "rate" INTEGER NOT NULL,
    "state" "PRODUCT_STATE" NOT NULL,
    "tags" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_businessId_key" ON "Product"("businessId");
