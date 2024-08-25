/*
  Warnings:

  - The values [AVAILABLE,OUT_OF_STOCK,DISABLED] on the enum `PRODUCT_STATE` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PRODUCT_STATE_new" AS ENUM ('DISPONIBLE', 'AGOTADO', 'DESACTIVADO');
ALTER TABLE "Product" ALTER COLUMN "state" TYPE "PRODUCT_STATE_new" USING ("state"::text::"PRODUCT_STATE_new");
ALTER TYPE "PRODUCT_STATE" RENAME TO "PRODUCT_STATE_old";
ALTER TYPE "PRODUCT_STATE_new" RENAME TO "PRODUCT_STATE";
DROP TYPE "PRODUCT_STATE_old";
COMMIT;
