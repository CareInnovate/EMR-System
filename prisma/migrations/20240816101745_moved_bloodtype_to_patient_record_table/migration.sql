/*
  Warnings:

  - You are about to drop the column `bloodType` on the `Patient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "bloodType";

-- AlterTable
ALTER TABLE "PatientRecord" ADD COLUMN     "bloodType" TEXT;
