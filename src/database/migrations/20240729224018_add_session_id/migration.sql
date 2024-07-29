/*
  Warnings:

  - Added the required column `sessionId` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "sessionId" VARCHAR(36) NOT NULL;
