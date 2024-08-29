/*
  Warnings:

  - Changed the type of `from` on the `WorkingHours` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `to` on the `WorkingHours` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "WorkingHours" ALTER COLUMN "date" SET DATA TYPE TEXT,
DROP COLUMN "from",
ADD COLUMN     "from" INTEGER NOT NULL,
DROP COLUMN "to",
ADD COLUMN     "to" INTEGER NOT NULL;
