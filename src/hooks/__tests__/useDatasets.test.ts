import { act, renderHook } from '@testing-library/react';
import { useDatasets } from '../useDatasets';

jest.mock('../../config/app-config', () => ({
  __esModule: true,
  default: { DATASETS: ['knowledge', 'ontology'] },
}));

describe('useDatasets', () => {
  it('offers the configured datasets with the first selected', () => {
    const { result } = renderHook(() => useDatasets());
    expect(result.current.options).toEqual(['knowledge', 'ontology']);
    expect(result.current.selected).toBe('knowledge');
  });

  it('selects a configured dataset and ignores unknown ones', () => {
    const { result } = renderHook(() => useDatasets());
    act(() => result.current.select('ontology'));
    expect(result.current.selected).toBe('ontology');
    act(() => result.current.select('mydataset'));
    expect(result.current.selected).toBe('ontology');
  });

  it('remembers the selection across remounts', () => {
    const first = renderHook(() => useDatasets());
    act(() => first.result.current.select('ontology'));
    first.unmount();
    const { result } = renderHook(() => useDatasets());
    expect(result.current.selected).toBe('ontology');
  });

  it('falls back to the first dataset when the stored one is not configured', () => {
    window.localStorage.setItem('query.selectedDataset', 'mydataset');
    const { result } = renderHook(() => useDatasets());
    expect(result.current.selected).toBe('knowledge');
  });

  it('clears custom datasets saved by the earlier build', () => {
    window.localStorage.setItem('query.customDatasets', JSON.stringify(['mydataset']));
    const { result } = renderHook(() => useDatasets());
    expect(result.current.options).toEqual(['knowledge', 'ontology']);
    expect(window.localStorage.getItem('query.customDatasets')).toBeNull();
  });
});
