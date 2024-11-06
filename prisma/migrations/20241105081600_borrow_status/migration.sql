-- DropForeignKey
ALTER TABLE `borrow_status` DROP FOREIGN KEY `Product_fkey`;

-- AddForeignKey
ALTER TABLE `Borrow_Status` ADD CONSTRAINT `Product_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
