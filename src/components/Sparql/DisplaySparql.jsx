import React, { useState } from 'react';
import { Spinner } from '@telicent-oss/ds';
import DisplayYasqe from './DisplayYasqe';
import SparqlTable from './SparqlTable';
import { QueryErrorAlert } from './QueryErrorAlert';
import Header from '../Header/Header';
import config from '../../config/app-config';
import { DatasetSelector } from '../DatasetSelector/DatasetSelector';
import { useDatasets } from '../../hooks/useDatasets';
import { buildEndpoint } from '../../lib/buildEndpoint';

const DisplaySparql = () => {
  const [results, setResults] = useState(null);
  const [duration, setDuration] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { options, selected, select, add } = useDatasets();

  return (
    <>
      <Header>
        <DatasetSelector options={options} value={selected} onSelect={select} onAdd={add} />
      </Header>

      <div className="p-1.5 sticky">
        <DisplayYasqe
          endpoint={buildEndpoint(config.SPARQL_URL, selected)}
          setResults={setResults}
          setDuration={setDuration}
          setLoading={setLoading}
          setError={setError}
        />
      </div>

      {error && <QueryErrorAlert error={error} />}

      {results && (
        <div>
          <div className="flex justify-between px-8 pb-3">
            <div className="py-2">
              Query Results
              <small className="ml-2.5">
                {results.length} results returned in {duration}m/s
              </small>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <Spinner className="text-white" />
            </div>
          ) : (
            <div className="flex flex-col">
              <SparqlTable bindings={results} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default DisplaySparql;
