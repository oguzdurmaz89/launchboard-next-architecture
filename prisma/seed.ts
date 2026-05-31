import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function main() {
  const owner = await prisma.user.upsert({
    where: {
      email: "oguz@launchboard.dev",
    },
    update: {},
    create: {
      name: "Oguz Durmaz",
      email: "oguz@launchboard.dev",
    },
  });

  await prisma.launch.deleteMany({
    where: {
      ownerId: owner.id,
    },
  });

  await prisma.launch.createMany({
    data: [
      {
        name: "Customer Portal Redesign",
        description:
          "Redesign the customer-facing portal with improved navigation and launch visibility.",
        status: "IN_PROGRESS",
        priority: "HIGH",
        targetDate: new Date("2026-06-12"),
        ownerId: owner.id,
      },
      {
        name: "Billing Dashboard",
        description:
          "Create a billing dashboard for internal finance and support teams.",
        status: "PLANNED",
        priority: "MEDIUM",
        targetDate: new Date("2026-06-24"),
        ownerId: owner.id,
      },
      {
        name: "Admin Access Review",
        description:
          "Review admin-level access flows before public launch readiness.",
        status: "BLOCKED",
        priority: "HIGH",
        targetDate: new Date("2026-06-05"),
        ownerId: owner.id,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
