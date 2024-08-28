/*
  Warnings:

  - The `diagnosis` column on the `MedicalRecord` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `medicalProcedures` column on the `MedicalRecord` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "MedicalRecord" ADD COLUMN     "medsInstruction" TEXT,
DROP COLUMN "diagnosis",
ADD COLUMN     "diagnosis" TEXT[],
ALTER COLUMN "treatmentPlan" DROP NOT NULL,
DROP COLUMN "medicalProcedures",
ADD COLUMN     "medicalProcedures" JSONB;
