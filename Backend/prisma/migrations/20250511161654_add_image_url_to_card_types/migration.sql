/*
  Warnings:

  - You are about to drop the column `giftId` on the `cartitem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cardtype` ADD COLUMN `imageUrl` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `cartitem` DROP COLUMN `giftId`;
