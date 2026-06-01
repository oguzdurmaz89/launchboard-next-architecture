import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

const seedUserEmail = process.env.SEED_USER_EMAIL ?? "demo@launchboard.local";
const seedUserName = process.env.SEED_USER_NAME ?? "Demo User";

async function main() {
  const owner = await prisma.user.upsert({
    where: {
      email: seedUserEmail,
    },
    update: {
      name: seedUserName,
    },
    create: {
      name: seedUserName,
      email: seedUserEmail,
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
      {
        name: "Mobile Onboarding Flow",
        description:
          "Build a cleaner onboarding experience for new mobile users.",
        status: "PLANNED",
        priority: "HIGH",
        targetDate: new Date("2026-07-03"),
        ownerId: owner.id,
      },
      {
        name: "Analytics Event Tracking",
        description:
          "Add structured analytics events across key product workflows.",
        status: "IN_PROGRESS",
        priority: "MEDIUM",
        targetDate: new Date("2026-07-10"),
        ownerId: owner.id,
      },
      {
        name: "Workspace Permissions",
        description:
          "Improve role-based access rules for workspace members and admins.",
        status: "BLOCKED",
        priority: "HIGH",
        targetDate: new Date("2026-07-18"),
        ownerId: owner.id,
      },
      {
        name: "Public Launch Page",
        description:
          "Create a public-facing launch detail page for shared campaigns.",
        status: "PLANNED",
        priority: "LOW",
        targetDate: new Date("2026-07-28"),
        ownerId: owner.id,
      },
      {
        name: "Notification Center",
        description:
          "Introduce a notification center for launch updates and blockers.",
        status: "IN_PROGRESS",
        priority: "MEDIUM",
        targetDate: new Date("2026-08-04"),
        ownerId: owner.id,
      },
      {
        name: "CSV Export Workflow",
        description:
          "Allow teams to export launch data for reporting and stakeholder reviews.",
        status: "PLANNED",
        priority: "LOW",
        targetDate: new Date("2026-08-14"),
        ownerId: owner.id,
      },
      {
        name: "Final Release Checklist",
        description:
          "Add a release readiness checklist before marking launches as completed.",
        status: "LAUNCHED",
        priority: "MEDIUM",
        targetDate: new Date("2026-08-22"),
        ownerId: owner.id,
      },
    ],
  });

  console.log(
    `Seed completed for ${owner.name ?? owner.email ?? owner.id}. Created 10 launches.`,
  );
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
