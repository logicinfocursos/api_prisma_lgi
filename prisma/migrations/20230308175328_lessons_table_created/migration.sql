-- AlterTable
ALTER TABLE `posts` ADD COLUMN `access` VARCHAR(25) NULL DEFAULT 'free',
    ADD COLUMN `readyClasses` BOOLEAN NULL DEFAULT false;

-- CreateTable
CREATE TABLE `lessons` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(25) NULL,
    `postcode` VARCHAR(25) NULL,
    `title` VARCHAR(255) NULL,
    `subtitle` VARCHAR(255) NULL,
    `type` VARCHAR(25) NULL,
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
