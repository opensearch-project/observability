import _ from 'lodash';
import { CoreStart } from '../../../../src/core/public';
import { DSL_ROUTE, SQL_ROUTE } from '../../server/utils/constants';

export function handleDslRequest(http: CoreStart['http'], DSL, query) {
  if (DSL?.query) {
    query.query.bool.must.push(...DSL.query.bool.must);
    query.query.bool.filter.push(...DSL.query.bool.filter);
    query.query.bool.should.push(...DSL.query.bool.should);
    query.query.bool.must_not.push(...DSL.query.bool.must_not);
    if (DSL.query.bool.minimum_should_match)
      query.query.bool.minimum_should_match = DSL.query.bool.minimum_should_match;
  }
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
