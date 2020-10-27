import { CoreStart } from '../../../../src/core/public';
import { DSL_ROUTE, SQL_ROUTE } from '../../server/utils/constants';

export function handleDslRequest(http: CoreStart['http'], query) {
  console.log('DSL:', query);
  return http
    .post(DSL_ROUTE, {
      body: JSON.stringify(query),
    })
    .catch((error) => console.error(error));
}

export function handleSqlRequest(http: CoreStart['http'], query: string) {
  console.log('SQL:', query);
  return http
    .post(SQL_ROUTE, {
      body: `{ "query": "${query}" }`,
    })
    .catch((error) => console.error(error));
}
