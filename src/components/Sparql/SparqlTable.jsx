import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const SparqlTable = ({ bindings }) => {
  const SparqlRow = ({ row, rowNumber }) => {
    const keys = Object.keys(row);
    return (
      <TableRow
        key={row.name}
        sx={{
          '&:last-child td, &:last-child th': { border: 0 },
          'th,td': { color: 'white !important' },
        }}
      >
        {keys.map((key, index) => (
          <SparqlCell
            value={row[key].value}
            type={row[key].type}
            key={`${rowNumber}-${index}-${row[key].value}`}
          />
        ))}
      </TableRow>
    );
  };
  const SparqlCell = ({ value, type }) => {
    return (
      <TableCell>
        <div className="flex w-auto items-center justify-between">
          <div title={value} className="text-ellipsis overflow-hidden max-h-[1.5rem] mr-2.5">
            {value}
          </div>
        </div>
      </TableCell>
    );
  };

  if (bindings.length === 0)
    return <div className="py-2">No results were returned from your query.</div>;
  if (bindings.length > 1000)
    return (
      <div className="py-2">
        More than 1000 results were returned, please make your query more specific.
      </div>
    );
  return (
    <div>
      <Table aria-label="results table" sx={{ th: { color: 'white', fontWeight: 800 } }}>
        <TableHead>
          <TableRow>
            {Object.keys(bindings[0]).map((key) => (
              <TableCell key={`heading-${key}`}>{key}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody sx={{ overflow: 'scroll' }}>
          {bindings.map((row, index) => (
            <SparqlRow row={row} rowNumber={index} key={`row-${index}`} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SparqlTable;
