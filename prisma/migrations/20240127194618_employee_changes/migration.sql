-- CreateTable
CREATE TABLE "employee" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "isadmin" BOOLEAN NOT NULL DEFAULT true,
    "createdat" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roles" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "employee_pkey" PRIMARY KEY ("id")
);
