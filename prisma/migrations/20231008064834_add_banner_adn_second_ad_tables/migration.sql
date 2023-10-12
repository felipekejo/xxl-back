-- CreateTable
CREATE TABLE "banners" (
    "id" TEXT NOT NULL,
    "img_url" TEXT NOT NULL,

    CONSTRAINT "banners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "second_ads" (
    "id" TEXT NOT NULL,
    "img_url" TEXT NOT NULL,

    CONSTRAINT "second_ads_pkey" PRIMARY KEY ("id")
);
