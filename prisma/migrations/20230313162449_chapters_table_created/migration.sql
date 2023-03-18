/*
  Warnings:

  - You are about to drop the column `postcode` on the `lessons` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `lessons` DROP COLUMN `postcode`,
    ADD COLUMN `chaptercode` VARCHAR(25) NULL,
    ADD COLUMN `coursecode` VARCHAR(25) NULL;

-- CreateTable
CREATE TABLE `chapters` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(25) NULL,
    `coursecode` VARCHAR(25) NULL,
    `title` VARCHAR(255) NULL,
    `subtitle` VARCHAR(255) NULL,
    `authorcode` VARCHAR(25) NULL,
    `content` TEXT NULL,
    `overview` VARCHAR(255) NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `status` INTEGER NOT NULL DEFAULT 1,
    `created_by` VARCHAR(25) NULL,
    `updated_by` VARCHAR(25) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
