/*
  Warnings:

  - The values [Rejected,Pending,Approved] on the enum `SellerStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SellerStatus_new" AS ENUM ('REJECTED', 'PENDING', 'APPROVED');
ALTER TABLE "Seller" ALTER COLUMN "status" TYPE "SellerStatus_new" USING ("status"::text::"SellerStatus_new");
ALTER TYPE "SellerStatus" RENAME TO "SellerStatus_old";
ALTER TYPE "SellerStatus_new" RENAME TO "SellerStatus";
DROP TYPE "public"."SellerStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "Seller" ALTER COLUMN "status" SET DEFAULT 'PENDING';
