/*
  Warnings:

  - You are about to drop the column `asset_id` on the `image` table. All the data in the column will be lost.
  - You are about to drop the column `public_id` on the `image` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `image` DROP COLUMN `asset_id`,
    DROP COLUMN `public_id`;
