/*
  Warnings:

  - You are about to drop the column `emergencyContact` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the `_InvoiceToMedication` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `available` to the `Medication` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_InvoiceToMedication" DROP CONSTRAINT "_InvoiceToMedication_A_fkey";

-- DropForeignKey
ALTER TABLE "_InvoiceToMedication" DROP CONSTRAINT "_InvoiceToMedication_B_fkey";

-- AlterTable
ALTER TABLE "Medication" ADD COLUMN     "available" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "emergencyContact",
ADD COLUMN     "emergencyContactMobileNo" TEXT,
ADD COLUMN     "emergencyContactName" TEXT;

-- DropTable
DROP TABLE "_InvoiceToMedication";

-- CreateTable
CREATE TABLE "Invoice_Medication" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "invoiceId" TEXT NOT NULL,
    "medicationId" TEXT NOT NULL,

    CONSTRAINT "Invoice_Medication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_Medication_invoiceId_medicationId_key" ON "Invoice_Medication"("invoiceId", "medicationId");

-- AddForeignKey
ALTER TABLE "Invoice_Medication" ADD CONSTRAINT "Invoice_Medication_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice_Medication" ADD CONSTRAINT "Invoice_Medication_medicationId_fkey" FOREIGN KEY ("medicationId") REFERENCES "Medication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
