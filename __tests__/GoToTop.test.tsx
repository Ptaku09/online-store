import GoToTop from '../components/GoToTop';
import { render } from '@testing-library/react';

describe('Go to top component', () => {
  it('should renders correctly', () => {
    const { getByLabelText } = render(<GoToTop />);

    getByLabelText(/go-to-top/i);
  });
});
