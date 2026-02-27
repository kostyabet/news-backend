/*
  Warnings:

  - You are about to drop the column `ui_role` on the `user-info` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ui_user]` on the table `user-info` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ui_role` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user-info" DROP CONSTRAINT "user-info_ui_role_fkey";

-- DropIndex
DROP INDEX "user-info_ui_user_ui_role_key";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "ui_role" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user-info" DROP COLUMN "ui_role";

-- CreateIndex
CREATE UNIQUE INDEX "user-info_ui_user_key" ON "user-info"("ui_user");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_ui_role_fkey" FOREIGN KEY ("ui_role") REFERENCES "user-role"("ur_id") ON DELETE RESTRICT ON UPDATE CASCADE;
