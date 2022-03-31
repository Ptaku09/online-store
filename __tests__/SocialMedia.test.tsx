import { render, screen } from '@testing-library/react';
import SocialMedia from '../components/SocialMedia';

describe('SocialMedia component', () => {
  it('renders correctly', () => {
    render(<SocialMedia />);
    screen.getByText('follow us');
  });
});
