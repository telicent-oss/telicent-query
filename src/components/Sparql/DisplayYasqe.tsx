import { AuthEvent, broadcastAuthEvent } from '@telicent-oss/ds';
import Yasqe from '@triply/yasqe';
import '@triply/yasqe/build/yasqe.min.css';
import 'codemirror/theme/material-darker.css';
import React, { useEffect, useRef } from 'react';
import { useThemeMode } from '../../hooks/useThemeMode';
import type { QueryError } from '../../adapters/http/httpError';
import { toQueryOutcome } from '../../adapters/sparql/sparqlResponseAdapter';

type DisplayYasqeProps = {
  endpoint: string;
  setResults: (value: unknown[] | null) => void;
  setDuration: (value: number | null) => void;
  setLoading: (value: boolean) => void;
  setError: (value: QueryError | null) => void;
};

const cmThemeFor = (dark: boolean) => (dark ? 'material-darker' : 'default');

const DisplayYasqe = ({
  endpoint,
  setResults,
  setDuration,
  setLoading,
  setError,
}: DisplayYasqeProps) => {
  const { dark } = useThemeMode();
  const yasqeRef = useRef<Yasqe | null>(null);

  useEffect(() => {
    const element = document.getElementById('yasqe');
    if (!element) return undefined;
    const yasqe = new Yasqe(element, {
      requestConfig: {
        endpoint,
        withCredentials: true,
      },
      createShareableLink: false,
      theme: cmThemeFor(dark),
    });
    yasqeRef.current = yasqe;

    // Yasqe emits queryResponse for both successes and failed requests.
    yasqe.on('queryResponse', (_instance: unknown, response: unknown, duration: number) => {
      setLoading(false);
      const outcome = toQueryOutcome(response);
      if (outcome.kind === 'unauthorized') {
        broadcastAuthEvent(AuthEvent.UNAUTHORIZED);
        return;
      }
      setDuration(duration);
      if (outcome.kind === 'error') {
        setResults(null);
        setError(outcome.error);
        return;
      }
      setResults(outcome.bindings);
    });
    yasqe.on('query', () => {
      setError(null);
      setLoading(true);
    });
    yasqe.on('error', (error: unknown) => {
      console.log({ error });
    });
    return () => {
      setResults(null);
      setDuration(null);
      yasqeRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setResults, setDuration, setLoading, setError]);

  // Flip the CodeMirror theme without re-creating Yasqe (preserves typed query).
  // Cast: yasqe narrows setOption to its own option enum but 'theme' is a valid
  // inherited CodeMirror option it doesn't re-type.
  useEffect(() => {
    (
      yasqeRef.current as unknown as { setOption(opt: 'theme', val: string): void } | null
    )?.setOption('theme', cmThemeFor(dark));
  }, [dark]);

  // Point at the newly selected dataset without re-creating Yasqe (preserves typed query).
  useEffect(() => {
    const requestConfig = yasqeRef.current?.config.requestConfig;
    if (requestConfig && typeof requestConfig !== 'function') requestConfig.endpoint = endpoint;
  }, [endpoint]);

  return <div id="yasqe" />;
};

export default DisplayYasqe;
