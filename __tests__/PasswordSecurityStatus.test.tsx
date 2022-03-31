import { render, screen } from '@testing-library/react';
import PasswordSecurityStatus from '../components/PasswordSecurityStatus';

describe('PasswordSecurityStatus component', () => {
  it('renders correctly', () => {
    const validationStatus = {
      characters: true,
      capital: true,
      digit: true,
    };

    render(<PasswordSecurityStatus validationStatus={validationStatus} />);
    screen.getByText('8 characters');
  });
});
