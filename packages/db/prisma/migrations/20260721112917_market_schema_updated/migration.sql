-- CreateEnum
CREATE TYPE "TradingStatus" AS ENUM ('Listed', 'Suspended', 'Delisted');

-- AlterTable
ALTER TABLE "Market" ADD COLUMN     "description" TEXT,
ADD COLUMN     "logo" TEXT,
ADD COLUMN     "tradingStatus" "TradingStatus" NOT NULL DEFAULT 'Listed';
