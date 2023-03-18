/*
  Warnings:

  - You are about to drop the column `filetype` on the `medias` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `summary` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `medias` DROP COLUMN `filetype`,
    ADD COLUMN `file` LONGBLOB NULL,
    ADD COLUMN `filename` VARCHAR(255) NULL,
    ADD COLUMN `typecontent` VARCHAR(25) NULL DEFAULT 'url',
    MODIFY `type` VARCHAR(25) NULL DEFAULT 'image';

-- AlterTable
ALTER TABLE `posts` DROP COLUMN `content`,
    DROP COLUMN `summary`,
    DROP COLUMN `userId`,
    ADD COLUMN `level` VARCHAR(25) NULL,
    ADD COLUMN `overview` VARCHAR(255) NULL,
    ADD COLUMN `strip` VARCHAR(25) NULL,
    ADD COLUMN `type` VARCHAR(25) NULL,
    MODIFY `status` INTEGER NULL DEFAULT 1,
    MODIFY `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);
