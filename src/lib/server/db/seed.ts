import { db } from "$lib/server/db/index.ts";
import { users } from "$lib/server/db/schema/users.ts";
import logger from "$lib/server/log.ts";
import { UserPermissions } from "$lib/share/user.ts";
import { env } from "$env/dynamic/private";
import { apps } from "$lib/server/db/schema/apps.ts";
import { AppCategories, AppStatus } from "$lib/share/app.ts";
import { sql } from "drizzle-orm";

export async function plantingSeed() {
  logger.info(`plainting database seed`);
  await db.transaction(async (tx) => {
    const count = await tx.$count(users);
    if (count > 0) {
      logger.info("table users already has data, skip plainting");
      return;
    }
    logger.info("table users has not data, plainting");

    const USERNAME = "ADMIN";
    const PHONE_NUMBER = env.INIT_ADMIN_PHONE;
    await tx.insert(users).values({
      userName: USERNAME,
      phoneNumber: PHONE_NUMBER,
      permissions: [UserPermissions.BaseAccess, UserPermissions.AdminAccess],
    });
    logger.info(
      `table users plainted, user_name: ${USERNAME}, phone_number: ${PHONE_NUMBER}`,
    );
  });

  await db.transaction(async (tx) => {
    const count = await tx.$count(apps);
    if (count > 0) {
      logger.info("table apps already has data, skip plainting");
      return;
    }
    logger.info("table apps has not data, plainting");

    for (const item of initApps) {
      await tx.insert(apps).values(item);
    }
  });
}

const initApps = [{
  routeId: "10001",
  name: "手办生成",
  category: AppCategories.CreativeDesign,
  keywords: ["手办生成", "大香蕉", "Nano Banana"],
  description: "用任意图片生成逼真手办",
  seoKeywords: [
    "doubao-seedream",
    "Nano Banana",
    "手办生成",
    "AI手办",
    "创意设计",
    "3D模型生成",
    "个性化手办",
    "虚拟模型",
    "动漫周边设计",
    "模型定制",
    "AI建模",
    "3D打印",
  ],
  seoDescription:
    "Nano Banana 手办生成与创意设计应用！利用顶尖AI技术，将您的想法一键转化为高精度3D手办模型。实现个性化手办定制、动漫周边设计和虚拟模型创作。您的专属AI建模工作室，让创意直达3D打印！",
  model: "seedream-4",
  source: "豆包",
  icon: "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp",
  barImg: "",
  rate: sql`'0.0'::numeric`,
  useCount: 0,
  points: 1,
  status: AppStatus.Enabled,
}];
