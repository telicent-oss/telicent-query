import { act, renderHook } from '@testing-library/react';
import { useDatasets } from '../useDatasets';

jest.mock('../../config/app-config', () => ({
  __esModule: true,
  default: { DATASETS: ['knowledge', 'ontology'] },
}));

describe('useDatasets', () => {
  it('defaults to config datasets with the first selected', () => {
    const { result } = renderHook(() => useDatasets());
    expect(result.current.options).toEqual(['knowledge', 'ontology']);
    expect(result.current.selected).toBe('knowledge');
  });

  it('selects an existing dataset and ignores unknown ones', () => {
    const { result } = renderHook(() => useDatasets());
    act(() => result.current.select('ontology'));
    expect(result.current.selected).toBe('ontology');
    act(() => result.current.select('nope'));
    expect(result.current.selected).toBe('ontology');
  });

  it('adds and selects a new dataset, persisting across remounts', () => {
    const first = renderHook(() => useDatasets());
    act(() => {
      first.result.current.add('mydataset');
    });
    expect(first.result.current.options).toEqual(['knowledge', 'ontology', 'mydataset']);
    expect(first.result.current.selected).toBe('mydataset');
    first.unmount();

    const { result } = renderHook(() => useDatasets());
    expect(result.current.options).toEqual(['knowledge', 'ontology', 'mydataset']);
    expect(result.current.selected).toBe('mydataset');
  });

  it('does not duplicate an existing dataset', () => {
    const { result } = renderHook(() => useDatasets());
    act(() => {
      result.current.add('ontology');
    });
    expect(result.current.options).toEqual(['knowledge', 'ontology']);
    expect(result.current.selected).toBe('ontology');
    expect(window.localStorage.getItem('query.customDatasets')).toBe('[]');
  });

  it('rejects invalid names', () => {
    const { result } = renderHook(() => useDatasets());
    let added = true;
    act(() => {
      added = result.current.add('../admin');
    });
    expect(added).toBe(false);
    expect(result.current.options).toEqual(['knowledge', 'ontology']);
    expect(result.current.selected).toBe('knowledge');
  });

  it('falls back to defaults when storage is corrupt or tampered with', () => {
    window.localStorage.setItem('query.customDatasets', '{not json');
    window.localStorage.setItem('query.selectedDataset', 'gone');
    const first = renderHook(() => useDatasets());
    expect(first.result.current.options).toEqual(['knowledge', 'ontology']);
    expect(first.result.current.selected).toBe('knowledge');
    first.unmount();

    window.localStorage.setItem('query.customDatasets', JSON.stringify(['ok', '../bad']));
    const { result } = renderHook(() => useDatasets());
    expect(result.current.options).toEqual(['knowledge', 'ontology']);
  });
});
