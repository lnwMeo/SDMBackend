/*
  Warnings:

  - Added the required column `path` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `image` ADD COLUMN `path` VARCHAR(191) NOT NULL;
