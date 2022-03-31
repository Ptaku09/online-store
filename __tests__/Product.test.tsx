import Product from '../components/Product';
import { render, screen } from '@testing-library/react';

describe('Product component', () => {
  it('renders correctly', () => {
    render(<Product id="test" name="test" price={20} thumbnailUrl="test.jpg" />);
    screen.getByText('test');
  });
});
