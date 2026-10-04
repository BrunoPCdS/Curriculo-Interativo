-- CreateTable
CREATE TABLE "videos" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "imagens" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "imagens_pkey" PRIMARY KEY ("id")
);
