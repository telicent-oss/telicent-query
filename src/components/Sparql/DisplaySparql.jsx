import React, { useState } from 'react';
import { TeliBasicLayout, TeliBrand, TeliHeader, TeliSpinner as Spinner } from '@telicent-oss/ds';
import DisplayYasqe from './DisplayYasqe';
import SparqlTable from './SparqlTable';
import { APP_CONFIG_JSON } from '../../constants';
import classNames from 'classnames';
import ScrollToTop from './ScrollToTop';

const DisplaySparql = () => {
  const [results, setResults] = useState(null);
  const [duration, setDuration] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <TeliBasicLayout>
      <TeliHeader
        className={classNames(
          'sticky top-0 h-16 z-20 transition-all duration-200 bg-black-100',
          {},
        )}
        navProps={{ className: 'pt-2' }}
      >
        <TeliBrand
          appName={APP_CONFIG_JSON.app_name}
          className="flex items-center justify-center"
        />

        <div className="bg-black-100 search--grid-template search--container"></div>
        <div className="absolute top-0 right-1"></div>
      </TeliHeader>
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
    </TeliBasicLayout>
  );
};

export default DisplaySparql;
