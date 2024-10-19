-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "deactivationDate" TIMESTAMP(3),
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
