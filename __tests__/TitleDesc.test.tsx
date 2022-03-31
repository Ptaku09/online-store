import TitleDesc from '../components/TitleDesc';
import { render, screen } from '@testing-library/react';

describe('TitleDesc component', () => {
  it('renders correctly', () => {
    render(<TitleDesc desc="test description" />);
    screen.getByText(/test description/i);
  });
});
