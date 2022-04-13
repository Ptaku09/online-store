import { render } from '@testing-library/react';
import FormField from '../components/FormField';

describe('Form field component', () => {
  it('should renders correctly', () => {
    const handleInputChange = jest.fn();

    const { getByText } = render(<FormField id="test" type="text" value="test" maxLength={20} onChange={handleInputChange} />);
    getByText(/test/i);
  });
});
