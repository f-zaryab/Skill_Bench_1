/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Package` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Package` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Package" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Package_slug_key" ON "Package"("slug");
