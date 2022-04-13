import Article from '../components/Article';
import { render } from '@testing-library/react';

describe('Article component', () => {
  it('should renders correctly', () => {
    const { getByText } = render(<Article index="01" title="Test title" titleDesc="Random descritption" description="Lorem ipsum dolor sit amet" />);

    getByText(/test/i);
  });
});
