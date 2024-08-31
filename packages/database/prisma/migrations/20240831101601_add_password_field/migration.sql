/*
  Warnings:

  - You are about to drop the column `image` on the `Tags` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tags" DROP COLUMN "image";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT;
