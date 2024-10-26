-- CreateEnum
CREATE TYPE "CEFR" AS ENUM ('A1', 'A2', 'B1', 'B2', 'C1', 'C2');

-- AlterTable
ALTER TABLE "Story" ADD COLUMN     "imageURL" TEXT,
ADD COLUMN     "mainLang" "Lang";

-- CreateTable
CREATE TABLE "StoryHelp" (
    "id" TEXT NOT NULL,
    "lang" "Lang" NOT NULL,
    "value" TEXT NOT NULL,
    "storyId" TEXT NOT NULL,

    CONSTRAINT "StoryHelp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Term" (
    "id" TEXT NOT NULL,
    "difficulty" "CEFR" NOT NULL,
    "imageURL" TEXT,

    CONSTRAINT "Term_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TermTranslation" (
    "id" TEXT NOT NULL,
    "lang" "Lang" NOT NULL,
    "value" TEXT NOT NULL,
    "termId" TEXT NOT NULL,

    CONSTRAINT "TermTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TermDefinition" (
    "id" TEXT NOT NULL,
    "lang" "Lang" NOT NULL,
    "value" TEXT NOT NULL,
    "termId" TEXT NOT NULL,

    CONSTRAINT "TermDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TermsOnStory" (
    "termId" TEXT NOT NULL,
    "storyId" TEXT NOT NULL,

    CONSTRAINT "TermsOnStory_pkey" PRIMARY KEY ("termId","storyId")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "tagGroupId" TEXT,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagGroup" (
    "id" TEXT NOT NULL,

    CONSTRAINT "TagGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagName" (
    "id" TEXT NOT NULL,
    "lang" "Lang" NOT NULL,
    "value" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "TagName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagsOnStory" (
    "tagId" TEXT NOT NULL,
    "storyId" TEXT NOT NULL,

    CONSTRAINT "TagsOnStory_pkey" PRIMARY KEY ("tagId","storyId")
);

-- AddForeignKey
ALTER TABLE "StoryHelp" ADD CONSTRAINT "StoryHelp_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermTranslation" ADD CONSTRAINT "TermTranslation_termId_fkey" FOREIGN KEY ("termId") REFERENCES "Term"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermDefinition" ADD CONSTRAINT "TermDefinition_termId_fkey" FOREIGN KEY ("termId") REFERENCES "Term"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermsOnStory" ADD CONSTRAINT "TermsOnStory_termId_fkey" FOREIGN KEY ("termId") REFERENCES "Term"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TermsOnStory" ADD CONSTRAINT "TermsOnStory_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_tagGroupId_fkey" FOREIGN KEY ("tagGroupId") REFERENCES "TagGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagName" ADD CONSTRAINT "TagName_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnStory" ADD CONSTRAINT "TagsOnStory_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnStory" ADD CONSTRAINT "TagsOnStory_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
