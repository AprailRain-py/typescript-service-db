-- sql code for creating given database structure problem in postgresql

CREATE TYPE "person_type" AS ENUM (
  'student',
  'professor'
);

CREATE TABLE "person" (
  "id" int PRIMARY KEY,
  "type" person_type,
  "name" varchar,
  "address_id" int
);

CREATE TABLE "address" (
  "id" int PRIMARY KEY,
  "street" varchar,
  "city" varchar,
  "country" varchar
);

CREATE TABLE "student" (
  "id" int PRIMARY KEY,
  "student_number" int,
  "person_id" int
);

CREATE TABLE "professor" (
  "id" int PRIMARY KEY,
  "salary" int,
  "person_id" int
);

CREATE TABLE "vehicle" (
  "id" int PRIMARY KEY,
  "model" varchar,
  "plate_number" varchar
);

CREATE TABLE "drive" (
  "id" int PRIMARY KEY,
  "distance" int,
  "created_at" date DEFAULT (now()),
  "vehicle_id" int,
  "person_id" int
);

ALTER TABLE "person" ADD FOREIGN KEY ("address_id") REFERENCES "address" ("id");

ALTER TABLE "student" ADD FOREIGN KEY ("person_id") REFERENCES "person" ("id");

ALTER TABLE "professor" ADD FOREIGN KEY ("person_id") REFERENCES "person" ("id");

ALTER TABLE "drive" ADD FOREIGN KEY ("vehicle_id") REFERENCES "vehicle" ("id");

ALTER TABLE "drive" ADD FOREIGN KEY ("person_id") REFERENCES "person" ("id");
