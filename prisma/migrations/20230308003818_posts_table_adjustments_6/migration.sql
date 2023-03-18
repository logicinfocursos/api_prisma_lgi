-- AlterTable
ALTER TABLE `posts` ADD COLUMN `additionaltext` VARCHAR(255) NULL,
    MODIFY `level` VARCHAR(25) NULL DEFAULT 'basic',
    MODIFY `type` VARCHAR(25) NULL DEFAULT 'article';
