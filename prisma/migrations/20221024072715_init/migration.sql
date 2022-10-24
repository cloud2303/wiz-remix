-- CreateTable
CREATE TABLE "token" (
    "id" SERIAL NOT NULL,
    "token" VARCHAR(256) NOT NULL,

    CONSTRAINT "token_pkey" PRIMARY KEY ("id")
);
