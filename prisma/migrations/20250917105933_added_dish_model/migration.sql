-- AlterTable
ALTER TABLE "public"."Bill" ADD COLUMN     "dishId" INTEGER;

-- CreateTable
CREATE TABLE "public"."Dishes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(12,6) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dishes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Bill" ADD CONSTRAINT "Bill_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "public"."Dishes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
