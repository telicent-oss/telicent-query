import { Fetcher } from '@graphiql/toolkit';
import { useAuth, Brand, Button, FlexBox, UIThemeProvider } from '@telicent-oss/ds';
import { GraphiQL } from 'graphiql';
import 'graphiql/graphiql.css';
import config from '../../config/app-config';
import { DatasetSelector } from '../DatasetSelector/DatasetSelector';
import { useDatasets } from '../../hooks/useDatasets';
import { useThemeMode } from '../../hooks/useThemeMode';
import { buildEndpoint, hasDatasetPlaceholder } from '../../lib/buildEndpoint';
import { toGraphqlFailure } from '../../adapters/graphql/graphqlResponseAdapter';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const TelicentGraphiQL = () => {
  const { api, user } = useAuth();
  const navigate = useNavigate();
  const { dark } = useThemeMode();
  const { options, selected, select } = useDatasets();
  const endpoint = buildEndpoint(config.GRAPHQL_URL, selected);

  const fetcher: Fetcher = useCallback(
    async (params) => {
      try {
        const { data } = await api.post(endpoint, params, {
          withCredentials: true,
        });
        return data;
      } catch (error) {
        const failure = toGraphqlFailure(error);
        // Leave 401s to the existing auth handling.
        if (failure.kind === 'unauthorized') throw error;
        return failure.result;
      }
    },
    [api, user, endpoint],
  );

  return (
    <section style={{ height: '100vh' }}>
      {/* Follow the app's theme switcher, not the OS or GraphiQL's own picker. */}
      <GraphiQL fetcher={fetcher} forcedTheme={dark ? 'dark' : 'light'}>
        <GraphiQL.Logo>
          <FlexBox direction="row" alignItems="center" gap={2}>
            <UIThemeProvider theme="GraphOrange" dark={dark}>
              {/* Match the height of the small DS Autocomplete beside it. */}
              <Button
                variant="secondary"
                size="small"
                sx={{ height: 40 }}
                onClick={() => navigate('/')}
              >
                SPARQL
              </Button>
            </UIThemeProvider>
            <Brand appName="queryQL" />
            {hasDatasetPlaceholder(config.GRAPHQL_URL) && (
              <UIThemeProvider theme="GraphOrange" dark={dark}>
                <DatasetSelector options={options} value={selected} onSelect={select} />
              </UIThemeProvider>
            )}
          </FlexBox>
        </GraphiQL.Logo>
      </GraphiQL>
    </section>
  );
};

export default TelicentGraphiQL;
