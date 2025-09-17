/*
  Warnings:

  - You are about to alter the column `amount` on the `Bill` table. The data in that column could be lost. The data in that column will be cast from `Decimal(12,2)` to `Decimal(12,6)`.
  - You are about to alter the column `customAmount` on the `Participant` table. The data in that column could be lost. The data in that column will be cast from `Decimal(12,2)` to `Decimal(12,6)`.

*/
-- AlterTable
ALTER TABLE "public"."Bill" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(12,6);

-- AlterTable
ALTER TABLE "public"."Participant" ALTER COLUMN "customAmount" SET DATA TYPE DECIMAL(12,6);
