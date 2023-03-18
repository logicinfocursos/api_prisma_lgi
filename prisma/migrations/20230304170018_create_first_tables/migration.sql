-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(25) NULL,
    `email` VARCHAR(191) NULL,
    `name` VARCHAR(255) NULL,
    `password` VARCHAR(191) NULL,
    `password_hash` VARCHAR(191) NULL,
    `type` VARCHAR(191) NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(25) NULL,
    `content` VARCHAR(255) NULL,
    `userId` INTEGER NOT NULL DEFAULT 0,
    `usercode` VARCHAR(25) NULL,
    `authorcode` VARCHAR(25) NULL,
    `categorycode` VARCHAR(25) NULL,
    `title` VARCHAR(255) NULL,
    `slug` VARCHAR(255) NULL,
    `subtitle` VARCHAR(255) NULL,
    `tags` VARCHAR(255) NULL,
    `obs` VARCHAR(255) NULL,
    `summary` VARCHAR(255) NULL,
    `text` TEXT NULL,
    `pdf` VARCHAR(255) NULL,
    `pdftext` VARCHAR(255) NULL,
    `url` VARCHAR(255) NULL,
    `urltext` VARCHAR(255) NULL,
    `video` VARCHAR(255) NULL,
    `videotext` VARCHAR(255) NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(25) NULL,
    `name` VARCHAR(255) NULL,
    `slug` VARCHAR(255) NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Author` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(25) NULL,
    `name` VARCHAR(255) NULL,
    `slug` VARCHAR(255) NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Media` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(25) NULL,
    `postId` INTEGER NOT NULL,
    `type` VARCHAR(25) NULL,
    `url` VARCHAR(255) NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(25) NULL,
    `postId` INTEGER NOT NULL DEFAULT 0,
    `type` VARCHAR(25) NULL,
    `image` VARCHAR(255) NULL,
    `author` VARCHAR(255) NULL,
    `comment` VARCHAR(255) NULL,
    `reply` VARCHAR(255) NULL,
    `replyowner` VARCHAR(255) NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `reply_created_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `View` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(25) NULL,
    `visitedpage` VARCHAR(255) NULL,
    `ipguest` VARCHAR(255) NULL,
    `region` VARCHAR(25) NULL,
    `country` VARCHAR(25) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
