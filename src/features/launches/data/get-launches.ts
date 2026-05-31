import { prisma } from "@/lib/db/prisma";
import {
  Launch,
  LaunchPriority,
  LaunchStatus,
} from "@/features/launches/types/launch";

/**
 * Bu type, Prisma'dan database'den dönen ham verinin şeklini temsil ediyor.
 *
 * Neden ayrı type yazıyoruz?
 * Çünkü database'den gelen veri ile UI'da kullanmak istediğimiz veri birebir aynı olmak zorunda değil.
 *
 * Database tarafında:
 * status: "IN_PROGRESS"
 *
 * UI tarafında:
 * status: "in_progress"
 *
 * O yüzden arada bir mapping/boundary katmanı kuruyoruz.
 */

type LaunchRecord = {
  id: string;
  name: string;
  status: string;
  priority: string;
  targetDate: Date;
  owner: {
    name: string | null;
    email: string;
  };
};

/**
 * Bu type, Prisma'dan database'den dönen ham verinin şeklini temsil ediyor.
 *
 * Neden ayrı type yazıyoruz?
 * Çünkü database'den gelen veri ile UI'da kullanmak istediğimiz veri birebir aynı olmak zorunda değil.
 *
 * Database tarafında:
 * status: "IN_PROGRESS"
 *
 * UI tarafında:
 * status: "in_progress"
 *
 * O yüzden arada bir mapping/boundary katmanı kuruyoruz.
 */

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
      /**
       * Bu defensive programming.
       *
       * Eğer database'den beklemediğimiz bir status gelirse sessizce yanlış data göstermiyoruz.
       * Direkt hata fırlatıyoruz ki problemi development sırasında yakalayalım.
       */
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
      /**
       * Burada da aynı mantık var.
       * Beklenmeyen priority değeri gelirse hatayı gizlemiyoruz.
       */
      throw new Error(`Unsupported launch priority : ${priority}`);
  }
};

/**
 * Bu fonksiyon database'den gelen ham Launch kaydını,
 * UI componentlerinin kullanacağı temiz Launch type'ına çeviriyor.
 *
 * Buna mapper diyoruz.
 *
 * Neden önemli?
 * Çünkü UI componentleri Prisma'nın database shape'ini bilmesin istiyoruz.
 * UI sadece kendi domain type'ı olan Launch ile çalışsın.
 */
const mapLaunch = (record: LaunchRecord): Launch => {
  return {
    id: record.id,
    name: record.name,
    status: mapLaunchStatus(record.status),
    priority: mapLaunchPriority(record.priority),
    ownerName: record.owner.name ?? record.owner.email,
    targetDate: record.targetDate.toISOString().slice(0, 10),
  };
};

/**
 * Dashboard ve launches list page için tüm launch kayıtlarını getiriyoruz.
 *
 * Bu fonksiyon server-side çalışır.
 * Çünkü içinde Prisma/database erişimi var.
 *
 * Client component içinde direkt kullanılmamalı.
 */
export const getLaunches = async (): Promise<Launch[]> => {
  /**
   * prisma.launch.findMany()
   *
   * PostgreSQL'deki Launch tablosundan kayıtları getirir.
   */
  const records = await prisma.launch.findMany({
    orderBy: {
      createdAt: "desc",
    },

    /**
     * Launch'ın owner bilgisini de aynı query içinde almak istiyoruz.
     *
     * Ama bütün User datasını çekmiyoruz.
     * Sadece UI için gereken name ve email alanlarını seçiyoruz.
     *
     * Bu iyi pratik:
     * Gereksiz data çekme.
     */
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

/**
 * Dynamic route için tek bir launch getiriyoruz.
 *
 * Örnek route:
 * /dashboard/launches/[id]
 *
 * Buradaki id parametresi ile database'de launch arıyoruz.
 */
export const getLaunchById = async (id: string): Promise<Launch | null> => {
  /**
   * findUnique tek bir kayıt arar.
   *
   * Burada Launch id unique olduğu için findUnique kullanıyoruz.
   */
  const record = await prisma.launch.findUnique({
    where: {
      id,
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
