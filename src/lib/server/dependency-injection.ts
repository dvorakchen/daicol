import { Container } from 'inversify';
import { historyRepoServiceId, PgHistoryRepo, type HistoryRepo } from "$lib/server/repo/histories.ts";
import { appRepoServiceId, PgAppRepo, type AppRepo } from "$lib/server/repo/apps/index.ts";

export const di: Container = new Container();
di.bind<HistoryRepo>(historyRepoServiceId).to(PgHistoryRepo).inTransientScope();
di.bind<AppRepo>(appRepoServiceId).to(PgAppRepo).inTransientScope();
