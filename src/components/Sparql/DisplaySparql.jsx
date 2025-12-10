import React, { useState } from 'react';
import { TeliSpinner as Spinner } from '@telicent-oss/ds';
import DisplayYasqe from './DisplayYasqe';
import SparqlTable from './SparqlTable';
import Header from '../Header';
import ScrollToTop from './ScrollToTop';

const DisplaySparql = () => {
  const [results, setResults] = useState(null);
  const [duration, setDuration] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Header />

      <div className="p-1.5 sticky">
        <DisplayYasqe setResults={setResults} setDuration={setDuration} setLoading={setLoading} />
      </div>

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
          <ScrollToTop />
        </div>
      )}
    </>
  );
};

export default DisplaySparql;
