/*
  Warnings:

  - You are about to drop the column `desciption` on the `Business` table. All the data in the column will be lost.
  - Added the required column `description` to the `Business` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Business" DROP COLUMN "desciption",
ADD COLUMN     "description" TEXT NOT NULL;
