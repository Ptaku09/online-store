import ArticleData from '../components/ArticleData';
import { render } from '@testing-library/react';

describe('Article data component', () => {
  it('should renders correctly', () => {
    const { getByText } = render(
      <ArticleData index="01" title="Test title" titleDesc="Random description" description="lorem ipsum dolor sit amet" />
    );

    getByText(/test/i);
  });
});
