import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '../components/Navbar';

describe('Navbar component', () => {
  beforeEach(() => {
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    useRouter.mockImplementation(() => ({
      pathname: '/',
      prefetch: jest.fn(),
      catch: jest.fn(),
    }));
  });

  afterEach(cleanup);

  it('renders correctly', () => {
    const { getByText } = render(<Navbar />);
    expect(getByText(/fvrt/i)).toBeInTheDocument();
  });
});
