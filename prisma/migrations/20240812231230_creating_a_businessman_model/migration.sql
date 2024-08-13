-- CreateTable
CREATE TABLE "Businessman" (
    "id" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Businessman_id_key" ON "Businessman"("id");

-- AddForeignKey
ALTER TABLE "Businessman" ADD CONSTRAINT "Businessman_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
