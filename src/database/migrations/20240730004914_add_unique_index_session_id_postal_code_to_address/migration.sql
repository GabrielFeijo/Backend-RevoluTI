/*
  Warnings:

  - A unique constraint covering the columns `[sessionId,postalCode]` on the table `Address` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Address_sessionId_postalCode_key" ON "Address"("sessionId", "postalCode");
