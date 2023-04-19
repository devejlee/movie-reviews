import { render } from '@testing-library/react';
import { ReviewCard } from './ReviewCard';

describe('ReviewCard', () => {
  test('renders the title, comment, and score', () => {
    const props = {
      title: 'Example Title',
      comment: 'This is an example comment.',
      score: 4,
    };

    const { getByText, getAllByTestId } = render(<ReviewCard {...props} />);

    const titleElement = getByText(props.title);
    const commentElement = getByText(props.comment);
    const scoreElements = getAllByTestId('circle');

    expect(titleElement).toBeInTheDocument();
    expect(commentElement).toBeInTheDocument();
    expect(scoreElements).toHaveLength(props.score);
  });
});
