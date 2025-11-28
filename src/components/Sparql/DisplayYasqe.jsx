import { AuthEvent, broadcastAuthEvent } from '@telicent-oss/ds';
import Yasqe from '@triply/yasqe';
import '@triply/yasqe/build/yasqe.min.css';
import 'codemirror/theme/material-darker.css';
import config from 'config/app-config';
import React, { useEffect } from 'react';

const DisplayYasqe = ({ setResults, setDuration, setLoading }) => {
  const yasqeOptions = {
    requestConfig: {
      endpoint: `${config.sparql.url}`,
      withCredentials: true,
    },
    createShareableLink: false,
    theme: 'material-darker',
  };

  useEffect(() => {
    const element = document.getElementById('yasqe');
    const yasqe = new Yasqe(element, yasqeOptions);

    yasqe.on('queryResponse', (instance, req, duration) => {
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
    yasqe.on('error', (error) => {
      console.log({ error });
    });
    return () => {
      setResults(null);
      setDuration(null);
    };
  }, [setResults, setDuration]);

  return <div id="yasqe" />;
};

export default DisplayYasqe;
