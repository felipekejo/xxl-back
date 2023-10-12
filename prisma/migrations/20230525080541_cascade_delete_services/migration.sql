-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_phoneId_fkey";

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_phoneId_fkey" FOREIGN KEY ("phoneId") REFERENCES "phones"("id") ON DELETE CASCADE ON UPDATE CASCADE;
