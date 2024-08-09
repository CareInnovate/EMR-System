-- CreateTable
CREATE TABLE "OTP" (
    "mobileNumber" TEXT NOT NULL,
    "passcode" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "OTP_mobileNumber_passcode_key" ON "OTP"("mobileNumber", "passcode");
