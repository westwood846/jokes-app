-- CreateEnum
CREATE TYPE "Lang" AS ENUM ('en', 'de', 'ru');

-- CreateTable
CREATE TABLE "Story" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Story_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoryBody" (
    "id" TEXT NOT NULL,
    "lang" "Lang" NOT NULL,
    "value" TEXT NOT NULL,
    "storyId" TEXT NOT NULL,

    CONSTRAINT "StoryBody_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoryTitle" (
    "id" TEXT NOT NULL,
    "lang" "Lang" NOT NULL,
    "value" TEXT NOT NULL,
    "storyId" TEXT NOT NULL,

    CONSTRAINT "StoryTitle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StoryBody" ADD CONSTRAINT "StoryBody_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryTitle" ADD CONSTRAINT "StoryTitle_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
