-- CreateTable
CREATE TABLE "LicenseCode" (
    "id" TEXT NOT NULL,
    "codeHash" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usedAt" TIMESTAMP(3),

    CONSTRAINT "LicenseCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "License" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "licenseCodeId" TEXT NOT NULL,
    "activatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "License_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LicenseCode_codeHash_key" ON "LicenseCode"("codeHash");

-- CreateIndex
CREATE INDEX "LicenseCode_createdById_createdAt_idx" ON "LicenseCode"("createdById", "createdAt");

-- CreateIndex
CREATE INDEX "LicenseCode_usedAt_idx" ON "LicenseCode"("usedAt");

-- CreateIndex
CREATE UNIQUE INDEX "License_userId_key" ON "License"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "License_licenseCodeId_key" ON "License"("licenseCodeId");

-- AddForeignKey
ALTER TABLE "LicenseCode" ADD CONSTRAINT "LicenseCode_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "License" ADD CONSTRAINT "License_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "License" ADD CONSTRAINT "License_licenseCodeId_fkey" FOREIGN KEY ("licenseCodeId") REFERENCES "LicenseCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
