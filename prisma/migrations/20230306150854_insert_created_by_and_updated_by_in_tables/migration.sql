-- AlterTable
ALTER TABLE `authors` ADD COLUMN `created_by` VARCHAR(25) NULL,
    ADD COLUMN `updated_by` VARCHAR(25) NULL;

-- AlterTable
ALTER TABLE `categories` ADD COLUMN `created_by` VARCHAR(25) NULL,
    ADD COLUMN `updated_by` VARCHAR(25) NULL;

-- AlterTable
ALTER TABLE `coments` ADD COLUMN `created_by` VARCHAR(25) NULL,
    ADD COLUMN `updated_by` VARCHAR(25) NULL;

-- AlterTable
ALTER TABLE `medias` ADD COLUMN `created_by` VARCHAR(25) NULL,
    ADD COLUMN `updated_by` VARCHAR(25) NULL;

-- AlterTable
ALTER TABLE `posts` ADD COLUMN `created_by` VARCHAR(25) NULL,
    ADD COLUMN `updated_by` VARCHAR(25) NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `created_by` VARCHAR(25) NULL,
    ADD COLUMN `updated_by` VARCHAR(25) NULL;
