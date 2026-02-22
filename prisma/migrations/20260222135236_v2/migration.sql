-- DropForeignKey
ALTER TABLE "user-role" DROP CONSTRAINT "user-role_ur_category_fkey";

-- AlterTable
ALTER TABLE "user-role" ALTER COLUMN "ur_category" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "user-role" ADD CONSTRAINT "user-role_ur_category_fkey" FOREIGN KEY ("ur_category") REFERENCES "category"("c_id") ON DELETE SET NULL ON UPDATE CASCADE;
