import { customType } from 'drizzle-orm/pg-core';
import { Buffer } from 'node:buffer';

/**
 * 自定义 BYTEA 类型，将数据库的 bytea 映射到 Node.js 的 Buffer
 * * 默认情况下，数据库驱动（如 `pg` 或 `postgres-js`）在查询时会将 BYTEA 字段转换为 Buffer。
 * 因此，我们只需要定义类型和 `dataType()` 方法。
 */
export const bytea = <TName extends string>(name: TName) =>
	customType<{
		data: Buffer;
		driverData: string;
	}>({
		dataType() {
			return 'bytea';
		},
		toDriver(value: Buffer): string {
			return value.toString('base64');
		},
		fromDriver(value: string): Buffer {
			if (typeof value === 'string') {
				return Buffer.from(value, 'base64');
			}
			return value as Buffer;
		}
	})(name);
