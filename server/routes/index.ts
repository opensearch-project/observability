import { ILegacyClusterClient, IRouter } from '../../../../src/core/server';
import { RegisterDslRouter } from './dslRouter';
import { RegisterSqlRouter } from './sqlRouter';

export function defineRoutes(router: IRouter, sqlClient?: ILegacyClusterClient) {
  RegisterDslRouter(router);
  if (sqlClient) RegisterSqlRouter(router, sqlClient);
}
