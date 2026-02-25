/*
  Warnings:

  - You are about to drop the column `ui_lastdName` on the `user-info` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "user-info_ui_user_ui_email_ui_avatar_ui_firstName_ui_lastdN_idx";

-- AlterTable
ALTER TABLE "user-info" DROP COLUMN "ui_lastdName",
ADD COLUMN     "ui_lastName" VARCHAR(128);

-- CreateIndex
CREATE INDEX "user-info_ui_user_ui_email_ui_avatar_ui_firstName_ui_lastNa_idx" ON "user-info"("ui_user", "ui_email", "ui_avatar", "ui_firstName", "ui_lastName");
