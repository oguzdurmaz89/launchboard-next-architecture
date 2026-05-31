-- CreateEnum
CREATE TYPE "LaunchStatus" AS ENUM ('PLANNED', 'IN_PROGRESS', 'BLOCKED', 'LAUNCHED');

-- CreateEnum
CREATE TYPE "LaunchPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Launch" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "LaunchStatus" NOT NULL DEFAULT 'PLANNED',
    "priority" "LaunchPriority" NOT NULL DEFAULT 'MEDIUM',
    "targetDate" TIMESTAMP(3) NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Launch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Launch_ownerId_idx" ON "Launch"("ownerId");

-- CreateIndex
CREATE INDEX "Launch_status_idx" ON "Launch"("status");

-- CreateIndex
CREATE INDEX "Launch_targetDate_idx" ON "Launch"("targetDate");

-- AddForeignKey
ALTER TABLE "Launch" ADD CONSTRAINT "Launch_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
