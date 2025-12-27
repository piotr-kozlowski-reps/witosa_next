-- DropForeignKey
ALTER TABLE "public"."CyclicalActivity" DROP CONSTRAINT "CyclicalActivity_authorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CyclicalActivityOccurrence" DROP CONSTRAINT "CyclicalActivityOccurrence_cyclicalActivityId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Event" DROP CONSTRAINT "Event_authorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ImageCyclicalActivity" DROP CONSTRAINT "ImageCyclicalActivity_cyclicalActivityId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ImageEvent" DROP CONSTRAINT "ImageEvent_eventId_fkey";

-- DropTable
DROP TABLE "public"."CyclicalActivity";

-- DropTable
DROP TABLE "public"."CyclicalActivityOccurrence";

-- DropTable
DROP TABLE "public"."Event";

-- DropTable
DROP TABLE "public"."ImageCyclicalActivity";

-- DropTable
DROP TABLE "public"."ImageEvent";

-- DropTable
DROP TABLE "public"."Newsletter";

-- DropTable
DROP TABLE "public"."User";

-- DropEnum
DROP TYPE "public"."ActivityType";

-- DropEnum
DROP TYPE "public"."Day";

-- DropEnum
DROP TYPE "public"."EventType";

-- DropEnum
DROP TYPE "public"."ForWhom";

-- DropEnum
DROP TYPE "public"."Place";

-- DropEnum
DROP TYPE "public"."UserRole";

