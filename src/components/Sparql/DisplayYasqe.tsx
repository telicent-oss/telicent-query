import { AuthEvent, broadcastAuthEvent } from '@telicent-oss/ds';
import Yasqe from '@triply/yasqe';
import '@triply/yasqe/build/yasqe.min.css';
import 'codemirror/theme/material-darker.css';
import config from 'config/app-config';
import React, { useEffect } from 'react';

type DisplayYasqeProps = {
  setResults: (value: unknown[] | null) => void;
  setDuration: (value: number | null) => void;
  setLoading: (value: boolean) => void;
};

const DisplayYasqe = ({ setResults, setDuration, setLoading }: DisplayYasqeProps) => {
  const yasqeOptions = {
    requestConfig: {
      endpoint: `${config.SPARQL_URL}`,
      withCredentials: true,
    },
    createShareableLink: false,
    theme: 'material-darker',
  };

  useEffect(() => {
    const element = document.getElementById('yasqe');
    if (!element) return undefined;
    const yasqe = new Yasqe(element, yasqeOptions);

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
    };
  }, [setResults, setDuration, setLoading]);

  return <div id="yasqe" />;
};

export default DisplayYasqe;
