import { Autocomplete } from '@telicent-oss/ds';
import React, { useMemo, useState } from 'react';
import { isValidDatasetName } from '../../config/env/env.schema';

type DatasetOption = { label: string; value: string };

type DatasetSelectorProps = {
  id?: string;
  options: string[];
  value: string;
  onSelect: (name: string) => void;
  onAdd: (name: string) => void;
};

const INVALID_NAME_MESSAGE = 'Letters, numbers, - and _ only';

const toOption = (name: string): DatasetOption => ({ label: name, value: name });

// DS Autocomplete has no freeSolo, so new names are offered as an extra
// `Add "name"` option (the MUI "creatable" pattern).
export const DatasetSelector = ({
  id = 'dataset-selector',
  options,
  value,
  onSelect,
  onAdd,
}: DatasetSelectorProps) => {
  const [inputValue, setInputValue] = useState(value);
  // MUI resets the typed text whenever `value` changes identity, so keep option objects stable.
  const autocompleteOptions = useMemo(() => options.map(toOption), [options]);
  const selectedOption = autocompleteOptions.find((o) => o.value === value) ?? null;
  const typed = inputValue.trim();
  const isExisting = options.includes(typed);
  const isInvalid = typed !== '' && !isExisting && !isValidDatasetName(typed);

  return (
    <Autocomplete
      id={id}
      label="Dataset"
      options={autocompleteOptions}
      value={selectedOption}
      inputValue={inputValue}
      onInputChange={(_, next) => setInputValue(next)}
      onChange={(next) => {
        if (!next) return;
        if (options.includes(next.value)) onSelect(next.value);
        else onAdd(next.value);
      }}
      filterOptions={(all) => {
        // Show every option while the input still shows the current selection.
        if (typed === '' || typed === value) return all;
        const matches = all.filter((o) => o.label.toLowerCase().includes(typed.toLowerCase()));
        return isExisting || !isValidDatasetName(typed)
          ? matches
          : [...matches, { label: `Add "${typed}"`, value: typed }];
      }}
      error={isInvalid}
      helperText={isInvalid ? INVALID_NAME_MESSAGE : undefined}
      fullWidth={false}
      sx={{ minWidth: 220 }}
    />
  );
};
