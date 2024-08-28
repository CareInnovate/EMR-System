-- AlterTable
ALTER TABLE "MedicalRecord" ADD COLUMN     "doctorId" TEXT NOT NULL DEFAULT '84217cb9-4af4-4a92-941d-3d26fb64e2de';

-- AddForeignKey
ALTER TABLE "MedicalRecord" ADD CONSTRAINT "MedicalRecord_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
