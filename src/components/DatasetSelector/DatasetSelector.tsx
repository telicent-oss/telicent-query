import { Autocomplete } from '@telicent-oss/ds';
import React, { useMemo } from 'react';

type DatasetOption = { label: string; value: string };

type DatasetSelectorProps = {
  id?: string;
  options: string[];
  value: string;
  onSelect: (name: string) => void;
};

const toOption = (name: string): DatasetOption => ({ label: name, value: name });

export const DatasetSelector = ({
  id = 'dataset-selector',
  options,
  value,
  onSelect,
}: DatasetSelectorProps) => {
  // MUI resets the typed text whenever `value` changes identity, so keep option objects stable.
  const autocompleteOptions = useMemo(() => options.map(toOption), [options]);
  const selectedOption = autocompleteOptions.find((o) => o.value === value) ?? null;

  return (
    <Autocomplete
      id={id}
      label="Dataset"
      options={autocompleteOptions}
      value={selectedOption}
      onChange={(next) => {
        if (next) onSelect(next.value);
      }}
      fullWidth={false}
      sx={{ minWidth: 220 }}
    />
  );
};
