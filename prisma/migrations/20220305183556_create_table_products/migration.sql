-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "desctription" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);
