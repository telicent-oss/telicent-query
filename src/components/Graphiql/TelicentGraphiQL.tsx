import { Fetcher } from '@graphiql/toolkit';
import { useAuth, Brand } from '@telicent-oss/ds';
import { GraphiQL } from 'graphiql';
import 'graphiql/graphiql.css';
import config from '../../config/app-config';
import { useCallback } from 'react';

const TelicentGraphiQL = () => {
  const { api, user } = useAuth();

  const fetcher: Fetcher = useCallback(
    async (params) => {
      const { data } = await api.post(config.GRAPHQL_URL, params, {
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
          <Brand appName="queryQL" />
        </GraphiQL.Logo>
      </GraphiQL>
    </section>
  );
};

export default TelicentGraphiQL;
