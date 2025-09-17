-- DropForeignKey
ALTER TABLE "public"."Bill" DROP CONSTRAINT "Bill_dishId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Bill" ADD CONSTRAINT "Bill_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "public"."Dishes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
