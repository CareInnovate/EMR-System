/*
  Warnings:

  - You are about to drop the column `gender` on the `Patient` table. All the data in the column will be lost.
  - Added the required column `sec` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "gender",
ADD COLUMN     "sec" "Sex" NOT NULL;

-- DropEnum
DROP TYPE "Gender";
