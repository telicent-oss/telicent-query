import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DatasetSelector } from './DatasetSelector';

const Harness = ({ onSelect = jest.fn() }: { onSelect?: jest.Mock }) => {
  const [value, setValue] = useState('knowledge');
  return (
    <DatasetSelector
      options={['knowledge', 'ontology']}
      value={value}
      onSelect={(name) => {
        onSelect(name);
        setValue(name);
      }}
    />
  );
};

const getInput = () => screen.getByRole('combobox', { name: 'Dataset' });

describe('DatasetSelector', () => {
  it('shows the current dataset', () => {
    render(<Harness />);
    expect(getInput()).toHaveValue('knowledge');
  });

  it('selects a configured dataset', async () => {
    const onSelect = jest.fn();
    render(<Harness onSelect={onSelect} />);
    fireEvent.mouseDown(getInput());
    await userEvent.click(await screen.findByRole('option', { name: 'ontology' }));
    expect(onSelect).toHaveBeenCalledWith('ontology');
    expect(getInput()).toHaveValue('ontology');
  });

  it('filters as you type and offers no way to add a dataset', async () => {
    render(<Harness />);
    await userEvent.clear(getInput());
    await userEvent.type(getInput(), 'onto');
    expect(await screen.findByRole('option', { name: 'ontology' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'knowledge' })).not.toBeInTheDocument();
    await userEvent.clear(getInput());
    await userEvent.type(getInput(), 'mydataset');
    expect(screen.queryAllByRole('option')).toHaveLength(0);
  });
});
