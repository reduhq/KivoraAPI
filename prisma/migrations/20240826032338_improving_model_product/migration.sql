/*
  Warnings:

  - You are about to drop the column `quantity` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Product` table. All the data in the column will be lost.
  - Added the required column `stock` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Product_businessId_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "quantity",
DROP COLUMN "state",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "stock" INTEGER NOT NULL,
ALTER COLUMN "rate" SET DEFAULT 0;

-- DropEnum
DROP TYPE "PRODUCT_STATE";
