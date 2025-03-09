/*
  Warnings:

  - Made the column `summary` on table `Recipe` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
UPDATE "Recipe" SET "summary" = 'Lorem ipsum dolor sit amet' WHERE "summary" IS NULL;
ALTER TABLE "Recipe" ALTER COLUMN "summary" SET NOT NULL,
ALTER COLUMN "summary" SET DEFAULT 'Lorem ipsum dolor sit amet';
