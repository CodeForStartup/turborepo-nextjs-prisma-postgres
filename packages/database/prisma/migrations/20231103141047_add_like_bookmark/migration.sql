-- CreateEnum
CREATE TYPE "PostOnUserType" AS ENUM ('LIKE', 'FAVORITE', 'FOLLOW', 'BOOKMARK');

-- CreateTable
CREATE TABLE "PostOnUser" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "type" "PostOnUserType" NOT NULL DEFAULT 'LIKE',

    CONSTRAINT "PostOnUser_pkey" PRIMARY KEY ("userId","postId")
);

-- AddForeignKey
ALTER TABLE "PostOnUser" ADD CONSTRAINT "PostOnUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostOnUser" ADD CONSTRAINT "PostOnUser_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
