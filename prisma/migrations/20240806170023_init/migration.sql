-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "region" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "woreda" TEXT NOT NULL,
    "kebele" INTEGER,
    "mobileNumber" TEXT NOT NULL,
    "email" TEXT,
    "occupation" TEXT,
    "emergencyContact" TEXT,
    "bloodType" TEXT,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatientRecord" (
    "id" TEXT NOT NULL,
    "patientType" TEXT NOT NULL DEFAULT 'Out',
    "patientCondition" TEXT NOT NULL,
    "allergies" TEXT[],
    "familyHistory" TEXT NOT NULL,

    CONSTRAINT "PatientRecord_pkey" PRIMARY KEY ("id")
);
