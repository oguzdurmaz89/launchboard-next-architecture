import { prisma } from "@/lib/db/prisma";
import {
  Launch,
  LaunchPriority,
  LaunchStatus,
} from "@/features/launches/types/launch";

type LaunchRecord = {
  id: string;
  name: string;
  status: string;
  priority: string;
  targetDate: Date;
  owner: {
    name: string | null;
    email: string | null;
  };
};

const mapLaunchStatus = (status: string): LaunchStatus => {
  switch (status) {
    case "PLANNED":
      return "planned";
    case "IN_PROGRESS":
      return "in_progress";
    case "BLOCKED":
      return "blocked";
    case "LAUNCHED":
      return "launched";
    default:
      throw new Error(`Unsupported launch status : ${status}`);
  }
};

const mapLaunchPriority = (priority: string): LaunchPriority => {
  switch (priority) {
    case "LOW":
      return "low";
    case "MEDIUM":
      return "medium";
    case "HIGH":
      return "high";
    default:
      throw new Error(`Unsupported launch priority : ${priority}`);
  }
};

const mapLaunch = (record: LaunchRecord): Launch => {
  return {
    id: record.id,
    name: record.name,
    status: mapLaunchStatus(record.status),
    priority: mapLaunchPriority(record.priority),
    ownerName: record.owner.name ?? record.owner.email ?? "Unknown owner",
    targetDate: record.targetDate.toISOString().slice(0, 10),
  };
};

export const getLaunches = async (ownerId: string): Promise<Launch[]> => {
  const records = await prisma.launch.findMany({
    where: {
      ownerId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      owner: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
  return records.map(mapLaunch);
};

export const getLaunchById = async (
  id: string,
  ownerId: string,
): Promise<Launch | null> => {
  const record = await prisma.launch.findFirst({
    where: {
      id,
      ownerId,
    },
    include: {
      owner: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
  if (!record) {
    return null;
  }
  return mapLaunch(record);
};
