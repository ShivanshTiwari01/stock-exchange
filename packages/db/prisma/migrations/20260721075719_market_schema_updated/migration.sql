/*
  Warnings:

  - A unique constraint covering the columns `[symbol]` on the table `Market` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Market` table without a default value. This is not possible if the table is not empty.
  - Added the required column `symbol` to the `Market` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Market" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "symbol" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Market_symbol_key" ON "Market"("symbol");
