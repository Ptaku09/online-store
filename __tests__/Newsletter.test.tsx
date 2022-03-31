import Newsletter from '../components/Newsletter';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

describe('Newsletter component', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ status: 200 }),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('renders correctly', () => {
    render(<Newsletter />);
    screen.getByText('SUBSCRIBE NEWSLETTER');
  });

  it('processes request', async () => {
    render(<Newsletter />);
    fireEvent.click(screen.getByText('SUBSCRIBE NEWSLETTER'));

    await screen.findByText(/Processing.../i);
  });

  it('responds with information about request status', async () => {
    window.IntersectionObserver = jest.fn(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
      root: null,
      rootMargin: '',
      takeRecords: jest.fn(),
      thresholds: [],
    }));

    render(<Newsletter />);
    fireEvent.input(screen.getByLabelText('NAME'), { target: { value: 'Jan' } });
    fireEvent.input(screen.getByLabelText(/surname/i), { target: { value: 'Kowalski' } });
    fireEvent.input(screen.getByLabelText(/email/i), { target: { value: 'test@gmail.com' } });

    expect(screen.getByTestId('form')).toHaveFormValues({
      name: 'Jan',
      surname: 'Kowalski',
      email: 'test@gmail.com',
    });

    fireEvent.click(screen.getByText('SUBSCRIBE NEWSLETTER'));
    await screen.findByText(/got it/i);
  });
});
