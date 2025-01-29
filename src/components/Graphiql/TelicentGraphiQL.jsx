import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { TeliBrand } from '@telicent-oss/ds';
import { GraphiQL } from 'graphiql';
import config from '../../config/app-config';

const fetcher = createGraphiQLFetcher({ url: `${config.graph.url}` });

export default () => (
  <section style={{ height: '100vh' }}>
    <GraphiQL fetcher={fetcher}>
      <GraphiQL.Logo>
        <TeliBrand appName="queryQL" className="flex items-center justify-center" />
      </GraphiQL.Logo>
    </GraphiQL>
  </section>
);
