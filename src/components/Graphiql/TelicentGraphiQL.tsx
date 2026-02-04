import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { TeliBrand, useAuth } from '@telicent-oss/ds';
import { GraphiQL } from 'graphiql';
import 'graphiql/graphiql.css';
import config from '../../config/app-config';
import { useCallback } from 'react';

const TelicentGraphiQLNew = () => {
  const { api, user } = useAuth(); // now legal

  const fetcher = useCallback(
    async (params) => {
      const { data } = await api.post(config.graph.url, params, {
        withCredentials: true,
      });
      return data;
    },
    [api, user],
  );

  return (
    <section style={{ height: '100vh' }}>
      <GraphiQL fetcher={fetcher}>
        <GraphiQL.Logo>
          <TeliBrand appName="queryQL" className="flex items-center justify-center" />
        </GraphiQL.Logo>
      </GraphiQL>
    </section>
  );
};

const TelicentGraphiQLLegacy = () => {
  const fetcher = createGraphiQLFetcher({ url: config.graph.url });

  return (
    <section style={{ height: '100vh' }}>
      <GraphiQL fetcher={fetcher}>
        <GraphiQL.Logo>
          <TeliBrand appName="queryQL" className="flex items-center justify-center" />
        </GraphiQL.Logo>
      </GraphiQL>
    </section>
  );
};

export default config.featureFlags.FF_AUTH_V2 ? TelicentGraphiQLNew : TelicentGraphiQLLegacy;
