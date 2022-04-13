import CartWidget from '../components/CartWidget';
import { render } from '@testing-library/react';

describe('Cart widget component', () => {
  it('should renders correctly', () => {
    const { getByLabelText } = render(<CartWidget />);

    getByLabelText(/shopping/i);
  });
});
