import { Fetcher } from '@graphiql/toolkit';
import { useAuth, Brand, Button, FlexBox, UIThemeProvider } from '@telicent-oss/ds';
import { GraphiQL } from 'graphiql';
import 'graphiql/graphiql.css';
import config from '../../config/app-config';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const TelicentGraphiQL = () => {
  const { api, user } = useAuth();
  const navigate = useNavigate();

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
          <FlexBox direction="row" alignItems="center" gap={2}>
            <UIThemeProvider theme="GraphOrange" dark>
              <Button variant="secondary" size="small" onClick={() => navigate('/')}>
                SPARQL
              </Button>
            </UIThemeProvider>
            <Brand appName="queryQL" />
          </FlexBox>
        </GraphiQL.Logo>
      </GraphiQL>
    </section>
  );
};

export default TelicentGraphiQL;
