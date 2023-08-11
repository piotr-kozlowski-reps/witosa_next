-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'EDITOR');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'EDITOR';

-- CreateTable
CREATE TABLE "Slide" (
    "id" TEXT NOT NULL,
    "slideTitle" TEXT NOT NULL,
    "slideUrl" TEXT NOT NULL,
    "slideAlt" TEXT NOT NULL,
    "eventType" "EventsType"[],
    "eventDate" TIMESTAMP(3) NOT NULL,
    "visibleFrom" TIMESTAMP(3) NOT NULL,
    "visibleUntil" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Slide_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Slide" ADD CONSTRAINT "Slide_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
