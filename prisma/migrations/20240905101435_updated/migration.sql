/*
  Warnings:

  - Changed the type of `duration` on the `Prescription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Prescription" DROP COLUMN "duration",
ADD COLUMN     "duration" BIGINT NOT NULL;
