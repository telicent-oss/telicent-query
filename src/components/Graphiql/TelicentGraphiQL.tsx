import { createGraphiQLFetcher, Fetcher } from '@graphiql/toolkit';
import { TeliBrand, useAuth } from '@telicent-oss/ds';
import { GraphiQL } from 'graphiql';
import 'graphiql/graphiql.css';
import config from '../../config/app-config';
import { useCallback } from 'react';

const DEFAULT_QUERY = `

# Welcome to GraphiQL
#
# GraphiQL is an in-browser tool for writing, validating, and
# testing GraphQL queries.
#
# Type queries into this side of the screen, and you will see intelligent
# typeaheads aware of the current GraphQL type schema and live syntax and
# validation errors highlighted within the text.
#
# GraphQL queries typically start with a "{" character. Lines that start
# with a # are ignored.
#
# An example GraphQL query might look like:
#
#     {
#       field(arg: "value") {
#         subField
#       }
#     }
#
# Keyboard shortcuts:
#
#   Prettify query:  Shift-Ctrl-P (or press the prettify button)
#
#  Merge fragments:  Shift-Ctrl-M (or press the merge button)
#
#        Run Query:  Ctrl-Enter (or press the play button)
#
#    Auto Complete:  Ctrl-Space (or just start typing)
#
{ __typename }
`;
const TelicentGraphiQLNew = () => {
  const { api, user } = useAuth(); // now legal

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
          <TeliBrand appName="queryQL" className="flex items-center justify-center" />
        </GraphiQL.Logo>
      </GraphiQL>
    </section>
  );
};

const TelicentGraphiQLLegacy = () => {
  const fetcher = createGraphiQLFetcher({ url: config.GRAPHQL_URL });

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
