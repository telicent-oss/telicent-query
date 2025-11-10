import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { TeliBrand, useAuth } from '@telicent-oss/ds';
import { GraphiQL } from 'graphiql';
import config from '../../config/app-config';

const useAuthFetcher = ({ url }) => {
  const { api } = useAuth();
  return async (graphQLParams) => {
    // We call your authenticated Axios instance
    console.log('searching');
    const response = await api.post(url, graphQLParams);
    console.log({ response });

    // Axios returns `data` already parsed
    return response.data;
  };
};

const getFetcher = () =>
  config.featureFlags.FF_AUTH_V2
    ? useAuthFetcher({ url: config.graph.url })
    : createGraphiQLFetcher({ url: config.graph.url });

export default () => {
  const fetcher = getFetcher();

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
