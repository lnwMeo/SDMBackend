/*
  Warnings:

  - You are about to drop the column `basketId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `basketId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the `basket` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `borrowDate` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `basket` DROP FOREIGN KEY `Basket_userId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_basketId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Basket_fkey`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `basketId`,
    ADD COLUMN `borrowDate` DATETIME(3) NOT NULL,
    ADD COLUMN `returnDate` DATETIME(3) NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `basketId`,
    ADD COLUMN `orderId` INTEGER NULL;

-- DropTable
DROP TABLE `basket`;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
