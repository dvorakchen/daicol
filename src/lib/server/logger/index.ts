import type { ServiceIdentifier } from 'inversify';

export interface Logger {
	info(message: string): void;
	warn(message: string): void;
	error(message: string): void;
}

export const loggerServiceId: ServiceIdentifier<Logger> = Symbol.for('loggerServiceId');
