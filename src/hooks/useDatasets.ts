import { useCallback, useEffect, useMemo, useState } from 'react';
import { z } from 'zod';
import config from '../config/app-config';
import { DATASET_NAME_SCHEMA, isValidDatasetName } from '../config/env/env.schema';

const CUSTOM_KEY = 'query.customDatasets';
const SELECTED_KEY = 'query.selectedDataset';

const CUSTOM_DATASETS_SCHEMA = z.array(DATASET_NAME_SCHEMA);

export type Datasets = {
  options: string[];
  selected: string;
  select: (name: string) => void;
  add: (name: string) => boolean;
};

function readCustom(): string[] {
  try {
    const raw = window.localStorage.getItem(CUSTOM_KEY);
    if (!raw) return [];
    const parsed = CUSTOM_DATASETS_SCHEMA.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : [];
  } catch {
    // localStorage may be unavailable, or the stored value may not be JSON
    return [];
  }
}

function readSelected(options: string[]): string {
  try {
    const stored = window.localStorage.getItem(SELECTED_KEY);
    if (stored && options.includes(stored)) return stored;
  } catch {
    // ignore
  }
  return options[0];
}

const findExisting = (options: string[], name: string): string | undefined =>
  options.find((o) => o.toLowerCase() === name.toLowerCase());

// Case-insensitive de-dupe; config names win over custom ones.
const merge = (base: string[], extra: string[]): string[] =>
  [...base, ...extra].filter(
    (name, i, all) => all.findIndex((n) => n.toLowerCase() === name.toLowerCase()) === i,
  );

export const useDatasets = (): Datasets => {
  const [custom, setCustom] = useState<string[]>(readCustom);
  const options = useMemo(() => merge(config.DATASETS, custom), [custom]);
  const [selected, setSelected] = useState<string>(() => readSelected(options));

  useEffect(() => {
    try {
      window.localStorage.setItem(CUSTOM_KEY, JSON.stringify(custom));
    } catch {
      // ignore
    }
  }, [custom]);

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

  const add = useCallback(
    (name: string) => {
      const trimmed = name.trim();
      if (!isValidDatasetName(trimmed)) return false;
      const existing = findExisting(options, trimmed);
      if (!existing) setCustom((prev) => [...prev, trimmed]);
      setSelected(existing ?? trimmed);
      return true;
    },
    [options],
  );

  return { options, selected, select, add };
};
