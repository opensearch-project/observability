import { SQL_ES_ENDPOINT } from "../../utils/constants";

export default function sqlPlugin(Client: any, config: any, components: any) {
  const ca = components.clientAction.factory;

  Client.prototype.sql = components.clientAction.namespaceFactory();
  const sql = Client.prototype.sql.prototype;

  sql.sqlQuery = ca({
    url: {
      fmt: SQL_ES_ENDPOINT,
    },
    needBody: true,
    method: 'POST',
  });
}
