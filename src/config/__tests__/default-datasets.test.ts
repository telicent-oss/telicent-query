import { readFileSync } from 'fs';
import path from 'path';
import { DEFAULT_DATASETS } from '../env/env.schema';

const VALUES_PATH = path.resolve(__dirname, '../../../charts/query-ui/values.yaml');

const readChartDatasets = (): string[] => {
  const values = readFileSync(VALUES_PATH, 'utf8');
  const block = values.match(/^datasets:\n((?:[ \t]+- .+\n)+)/m);
  if (!block) throw new Error(`No datasets list found in ${VALUES_PATH}`);
  return block[1]
    .split('\n')
    .map((line) => line.replace(/^\s*- /, '').trim())
    .filter(Boolean);
};

describe('DEFAULT_DATASETS', () => {
  it('matches the datasets value in the Helm chart', () => {
    expect(readChartDatasets()).toEqual(DEFAULT_DATASETS);
  });
});
