
import { customType } from 'drizzle-orm/pg-core';
import type { Buffer } from 'node:buffer';

/**
 * 自定义 BYTEA 类型，将数据库的 bytea 映射到 Node.js 的 Buffer
 * * 默认情况下，数据库驱动（如 `pg` 或 `postgres-js`）在查询时会将 BYTEA 字段转换为 Buffer。
 * 因此，我们只需要定义类型和 `dataType()` 方法。
 */
export const bytea = <TName extends string>(name: TName) =>
	customType<{
		data: Buffer;
		driverData: Buffer;
	}>({
		// 告诉 Drizzle Kit 和数据库使用 'bytea' 类型
		dataType() {
			return 'bytea';
		}
		// 可选：用于处理数据在应用层和驱动层之间的转换。
		// 在 Node.js 中，Buffer 已经是驱动程序可识别的类型，所以通常不需要 toDriver/fromDriver。
		// 但如果你使用 neon serverless driver，可能需要类似以下转换：
		// toDriver(value: Buffer): string {
		//   // 将 Buffer 转换为 Base64 字符串，以便通过 HTTP 发送到 Neon
		//   return value.toString('base64');
		// },
		// fromDriver(value: string): Buffer {
		//   // 从 Base64 字符串创建 Buffer
		//   return Buffer.from(value, 'base64');
		// },
	})(name);
