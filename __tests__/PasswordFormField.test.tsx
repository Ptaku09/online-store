import { render, screen } from '@testing-library/react';
import PasswordFormField from '../components/PasswordFormField';
import React from 'react';

describe('PasswordFormField component', () => {
  it('renders correctly', () => {
    const onChange = jest.fn();
    render(<PasswordFormField label="password" name="current" value="pass" onChange={onChange} />);
    screen.getByText(/password/i);
  });
});
