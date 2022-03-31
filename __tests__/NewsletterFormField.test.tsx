import { render, screen } from '@testing-library/react';
import React from 'react';
import NewsletterFormField from '../components/NewsletterFromField';

describe('NewsletterFormField component', () => {
  it('renders correctly', () => {
    const onChange = jest.fn();
    render(<NewsletterFormField id="test" type="text" value="test" maxLength={20} onChange={onChange} />);
    screen.getByText(/test/i);
  });
});
