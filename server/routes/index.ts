import { ILegacyClusterClient, IRouter } from '../../../../src/core/server';
import { DslRouter } from './dslRouter';
import { SqlRouter } from './sqlRouter';

export function defineRoutes(router: IRouter, sqlClient?: ILegacyClusterClient) {
  DslRouter(router);
  if (sqlClient) SqlRouter(router, sqlClient);
}
