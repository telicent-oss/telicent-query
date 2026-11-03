import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryErrorAlert } from './QueryErrorAlert';

describe('QueryErrorAlert', () => {
  it('shows the title and detail', () => {
    render(<QueryErrorAlert error={{ title: '503 Service Unavailable', detail: 'Compacting' }} />);
    expect(screen.getByRole('alert')).toHaveAttribute('id', 'query-error');
    expect(screen.getByText('503 Service Unavailable')).toBeInTheDocument();
    expect(screen.getByText('Compacting')).toBeInTheDocument();
  });

  it('omits the detail when there is none', () => {
    const { container } = render(<QueryErrorAlert error={{ title: 'Request failed (599)' }} />);
    expect(container.querySelector('pre')).toBeNull();
  });
});
