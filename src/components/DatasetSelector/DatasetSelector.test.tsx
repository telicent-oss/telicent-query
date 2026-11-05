import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DatasetSelector } from './DatasetSelector';

const Harness = ({
  onSelect = jest.fn(),
  onAdd = jest.fn(),
}: {
  onSelect?: jest.Mock;
  onAdd?: jest.Mock;
}) => {
  const [options, setOptions] = useState(['knowledge', 'ontology']);
  const [value, setValue] = useState('knowledge');
  return (
    <DatasetSelector
      options={options}
      value={value}
      onSelect={(name) => {
        onSelect(name);
        setValue(name);
      }}
      onAdd={(name) => {
        onAdd(name);
        setOptions((prev) => [...prev, name]);
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

  it('selects an existing dataset', async () => {
    const onSelect = jest.fn();
    render(<Harness onSelect={onSelect} />);
    fireEvent.mouseDown(getInput());
    await userEvent.click(await screen.findByRole('option', { name: 'ontology' }));
    expect(onSelect).toHaveBeenCalledWith('ontology');
    expect(getInput()).toHaveValue('ontology');
  });

  it('offers to add a new dataset and adds it', async () => {
    const onAdd = jest.fn();
    render(<Harness onAdd={onAdd} />);
    await userEvent.clear(getInput());
    await userEvent.type(getInput(), 'mydataset');
    await userEvent.click(await screen.findByRole('option', { name: 'Add "mydataset"' }));
    expect(onAdd).toHaveBeenCalledWith('mydataset');
    expect(getInput()).toHaveValue('mydataset');
  });

  it('does not offer to add an existing dataset', async () => {
    render(<Harness />);
    await userEvent.clear(getInput());
    await userEvent.type(getInput(), 'ontology');
    expect(await screen.findByRole('option', { name: 'ontology' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: /^Add/ })).not.toBeInTheDocument();
  });

  it('treats a case-only variant as the existing dataset', async () => {
    render(<Harness />);
    await userEvent.clear(getInput());
    await userEvent.type(getInput(), 'OntologY');
    expect(await screen.findByRole('option', { name: 'ontology' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: /^Add/ })).not.toBeInTheDocument();
    expect(screen.queryByText('Letters, numbers, - and _ only')).not.toBeInTheDocument();
  });

  it('flags invalid names and does not offer to add them', async () => {
    render(<Harness />);
    await userEvent.clear(getInput());
    await userEvent.type(getInput(), 'bad/name');
    expect(screen.getByText('Letters, numbers, - and _ only')).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: /^Add/ })).not.toBeInTheDocument();
  });
});
