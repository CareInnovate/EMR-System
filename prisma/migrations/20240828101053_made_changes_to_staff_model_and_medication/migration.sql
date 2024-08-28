/*
  Warnings:

  - You are about to drop the column `specialization` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the `_MedicalRecordToMedication` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MedicalRecordToSymptom` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('Scheduled', 'InProgress', 'Completed', 'CheckedIn');

-- DropForeignKey
ALTER TABLE "_MedicalRecordToMedication" DROP CONSTRAINT "_MedicalRecordToMedication_A_fkey";

-- DropForeignKey
ALTER TABLE "_MedicalRecordToMedication" DROP CONSTRAINT "_MedicalRecordToMedication_B_fkey";

-- DropForeignKey
ALTER TABLE "_MedicalRecordToSymptom" DROP CONSTRAINT "_MedicalRecordToSymptom_A_fkey";

-- DropForeignKey
ALTER TABLE "_MedicalRecordToSymptom" DROP CONSTRAINT "_MedicalRecordToSymptom_B_fkey";

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "status" "AppointmentStatus" NOT NULL DEFAULT 'Scheduled',
ALTER COLUMN "type" SET DEFAULT 'Consultation';

-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "specialization" TEXT;

-- AlterTable
ALTER TABLE "MedicalRecord" ADD COLUMN     "symptomId" TEXT,
ADD COLUMN     "symptoms" TEXT[];

-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "specialization";

-- DropTable
DROP TABLE "_MedicalRecordToMedication";

-- DropTable
DROP TABLE "_MedicalRecordToSymptom";

-- CreateTable
CREATE TABLE "Prescription" (
    "id" TEXT NOT NULL,
    "dosage" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "instruction" TEXT,
    "medicationId" TEXT NOT NULL,
    "medicalRecordId" TEXT NOT NULL,

    CONSTRAINT "Prescription_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Prescription" ADD CONSTRAINT "Prescription_medicationId_fkey" FOREIGN KEY ("medicationId") REFERENCES "Medication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prescription" ADD CONSTRAINT "Prescription_medicalRecordId_fkey" FOREIGN KEY ("medicalRecordId") REFERENCES "MedicalRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalRecord" ADD CONSTRAINT "MedicalRecord_symptomId_fkey" FOREIGN KEY ("symptomId") REFERENCES "Symptom"("id") ON DELETE SET NULL ON UPDATE CASCADE;
