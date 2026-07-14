/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `mobile` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- DropIndex
DROP INDEX "User_mobile_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
DROP COLUMN "mobile";
