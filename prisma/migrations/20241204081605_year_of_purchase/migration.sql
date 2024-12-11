/*
  Warnings:

  - Added the required column `year_of_purchaseId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `year_of_purchaseId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Year_of_purchase` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `year` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_Year_fkey` FOREIGN KEY (`year_of_purchaseId`) REFERENCES `Year_of_purchase`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
