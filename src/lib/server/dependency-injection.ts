import { Container } from 'inversify';
import {
	type HistoryRepo,
	historyRepoServiceId,
	PgHistoryRepo
} from '$lib/server/repo/histories.ts';
import { type AppRepo, appRepoServiceId, PgAppRepo } from '$lib/server/repo/apps/index.ts';
import { PgUserRepo, type UserRepo, userRepoServiceId } from '$lib/server/repo/users.ts';
import { type Bucket, bucketServiceId, Image } from '$lib/server/file-store.ts';
import { type Logger, loggerServiceId } from '$lib/server/logger/index.ts';
import { WinstonLogger } from '$lib/server/logger/winston-logger.ts';
import { type Generator, generatorServiceId } from '$lib/server/generator/index.ts';
import { DoubaoGenerator } from '$lib/server/generator/doubao.ts';

export const di: Container = new Container();
di.bind<Logger>(loggerServiceId).to(WinstonLogger).inSingletonScope();

di.bind<HistoryRepo>(historyRepoServiceId).to(PgHistoryRepo).inTransientScope();
di.bind<AppRepo>(appRepoServiceId).to(PgAppRepo).inTransientScope();
di.bind<UserRepo>(userRepoServiceId).to(PgUserRepo).inTransientScope();
di.bind<Bucket>(bucketServiceId).to(Image).inTransientScope();
di.bind<Generator>(generatorServiceId).to(DoubaoGenerator).inTransientScope();
