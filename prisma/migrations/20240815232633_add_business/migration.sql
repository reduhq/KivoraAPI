-- CreateTable
CREATE TABLE "Business" (
    "id" SERIAL NOT NULL,
    "businessmanId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "picture" TEXT,
    "desciption" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "whatsapp" TEXT,
    "instagram" TEXT,
    "x" TEXT,
    "facebook" TEXT,
    "rate" INTEGER,

    CONSTRAINT "Business_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_businessmanId_fkey" FOREIGN KEY ("businessmanId") REFERENCES "Businessman"("id") ON DELETE CASCADE ON UPDATE CASCADE;
