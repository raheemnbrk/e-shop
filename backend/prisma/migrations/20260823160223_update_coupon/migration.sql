/*
  Warnings:

  - You are about to drop the column `discountPercent` on the `Coupon` table. All the data in the column will be lost.
  - Added the required column `discount` to the `Coupon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Coupon` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CouponType" AS ENUM ('PERCENTAGE', 'FIXED');

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Coupon" DROP COLUMN "discountPercent",
ADD COLUMN     "discount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "type" "CouponType" NOT NULL DEFAULT 'PERCENTAGE',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
