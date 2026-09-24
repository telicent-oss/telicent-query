import { AuthEvent, broadcastAuthEvent } from '@telicent-oss/ds';
import Yasqe from '@triply/yasqe';
import '@triply/yasqe/build/yasqe.min.css';
import 'codemirror/theme/material-darker.css';
import config from 'config/app-config';
import React, { useEffect, useRef } from 'react';
import { useThemeMode } from '../../hooks/useThemeMode';

type DisplayYasqeProps = {
  setResults: (value: unknown[] | null) => void;
  setDuration: (value: number | null) => void;
  setLoading: (value: boolean) => void;
};

const cmThemeFor = (dark: boolean) => (dark ? 'material-darker' : 'default');

const DisplayYasqe = ({ setResults, setDuration, setLoading }: DisplayYasqeProps) => {
  const { dark } = useThemeMode();
  const yasqeRef = useRef<Yasqe | null>(null);

  useEffect(() => {
    const element = document.getElementById('yasqe');
    if (!element) return undefined;
    const yasqe = new Yasqe(element, {
      requestConfig: {
        endpoint: `${config.SPARQL_URL}`,
        withCredentials: true,
      },
      createShareableLink: false,
      theme: cmThemeFor(dark),
    });
    yasqeRef.current = yasqe;

    yasqe.on('queryResponse', (_instance: unknown, req: any, duration: number) => {
      console.log({ req });
      if (req.status === 401) {
        broadcastAuthEvent(AuthEvent.UNAUTHORIZED);
        return;
      }
      setResults(req.body.results.bindings);
      setDuration(duration);
      setLoading(false);
    });
    yasqe.on('query', () => {
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
  }, [setResults, setDuration, setLoading]);

  // Flip the CodeMirror theme without re-creating Yasqe (preserves typed query).
  useEffect(() => {
    yasqeRef.current?.setOption('theme', cmThemeFor(dark));
  }, [dark]);

  return <div id="yasqe" />;
};

export default DisplayYasqe;
