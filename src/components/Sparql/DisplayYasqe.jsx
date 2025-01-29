import Yasqe from '@triply/yasqe';
import '@triply/yasqe/build/yasqe.min.css';
import 'codemirror/theme/material-darker.css';
import config from 'config/app-config';
import React, { useEffect } from 'react';

const yasqeOptions = {
  requestConfig: {
    endpoint: `${config.sparql.url}`,
  },
  createShareableLink: false,
  theme: 'material-darker',
};

const DisplayYasqe = ({ setResults, setDuration, setLoading }) => {
  useEffect(() => {
    const element = document.getElementById('yasqe');
    const yasqe = new Yasqe(element, yasqeOptions);

    yasqe.on('queryResponse', (instance, req, duration) => {
      setResults(req.body.results.bindings);
      setDuration(duration);
      setLoading(false);
    });
    yasqe.on('query', () => {
      setLoading(true);
    });
    return () => {
      setResults(null);
      setDuration(null);
    };
  }, [setResults, setDuration]);

  return <div id="yasqe" />;
};

export default DisplayYasqe;
