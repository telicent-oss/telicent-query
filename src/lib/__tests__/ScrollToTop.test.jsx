import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ScrollToTop from '../ScrollToTop';

describe('ScrollToTop', () => {
  it('renders the button', () => {
    render(<ScrollToTop />);

    expect(screen.getByRole('button', { name: 'Return to top' })).toBeInTheDocument();
  });

  it('calls window.scrollTo when clicked', () => {
    const scrollToMock = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});

    render(<ScrollToTop />);

    fireEvent.click(screen.getByRole('button', { name: 'Return to top' }));

    expect(scrollToMock).toHaveBeenCalledWith(0, 0);

    scrollToMock.mockRestore();
  });

  it('changes background color on hover', () => {
    render(<ScrollToTop />);

    const button = screen.getByRole('button', { name: 'Return to top' });

    fireEvent.mouseEnter(button);

    expect(button.style.backgroundColor).toBe('rgba(255, 162, 47, 0.75)');

    fireEvent.mouseLeave(button);

    expect(button.style.backgroundColor).toBe('rgba(255, 162, 47, 0.2)');
  });
});
