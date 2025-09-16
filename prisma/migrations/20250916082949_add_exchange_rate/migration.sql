/*
  Warnings:

  - Added the required column `exchangeRate` to the `Currency` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Currency" ADD COLUMN     "exchangeRate" DECIMAL(12,6) NOT NULL;
