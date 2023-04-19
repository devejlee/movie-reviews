import { render } from '@testing-library/react';
import { ReviewCardsWrap } from './ReviewCardsWrap';

describe('ReviewCardsWrap', () => {
  const movies = [
    { id: 1, title: 'Movie 1', comment: 'Comment 1', score: 3 },
    { id: 2, title: 'Movie 2', comment: 'Comment 2', score: 4 },
    { id: 3, title: 'Movie 3', comment: 'Comment 3', score: 5 },
  ];

  test('renders a list of ReviewCard components', () => {
    const { getByText } = render(<ReviewCardsWrap movies={movies} />);

    expect(getByText('All Reviews')).toBeInTheDocument();
    expect(getByText('Movie 1')).toBeInTheDocument();
    expect(getByText('Comment 1')).toBeInTheDocument();
    expect(getByText('Movie 2')).toBeInTheDocument();
    expect(getByText('Comment 2')).toBeInTheDocument();
    expect(getByText('Movie 3')).toBeInTheDocument();
    expect(getByText('Comment 3')).toBeInTheDocument();
  });
});
