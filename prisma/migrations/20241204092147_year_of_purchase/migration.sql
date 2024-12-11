/*
  Warnings:

  - A unique constraint covering the columns `[year]` on the table `Year_of_purchase` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Year_of_purchase_year_key` ON `Year_of_purchase`(`year`);
