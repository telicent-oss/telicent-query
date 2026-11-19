import { useCallback, useEffect, useState } from 'react';
import config from '../config/app-config';

const SELECTED_KEY = 'query.selectedDataset';
// Written by an earlier build that let users add their own datasets.
const LEGACY_CUSTOM_KEY = 'query.customDatasets';

export type Datasets = {
  options: string[];
  selected: string;
  select: (name: string) => void;
};

function readSelected(options: string[]): string {
  try {
    const stored = window.localStorage.getItem(SELECTED_KEY);
    if (stored && options.includes(stored)) return stored;
  } catch {
    // localStorage may be unavailable (private mode, sandbox, etc.)
  }
  return options[0];
}

// Datasets come only from config, because each one must also be allowed by
// the graph access policies. DevOps sets them in the Helm `datasets` value.
export const useDatasets = (): Datasets => {
  const options = config.DATASETS;
  const [selected, setSelected] = useState<string>(() => readSelected(options));

  useEffect(() => {
    try {
      window.localStorage.removeItem(LEGACY_CUSTOM_KEY);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(SELECTED_KEY, selected);
    } catch {
      // ignore
    }
  }, [selected]);

  const select = useCallback(
    (name: string) => {
      if (options.includes(name)) setSelected(name);
    },
    [options],
  );

  return { options, selected, select };
};
