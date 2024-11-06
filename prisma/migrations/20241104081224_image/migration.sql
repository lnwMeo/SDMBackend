/*
  Warnings:

  - You are about to drop the column `secure_url` on the `image` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `image` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `image` DROP COLUMN `secure_url`,
    DROP COLUMN `url`;
