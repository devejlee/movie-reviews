import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { ReviewInputWrap } from './ReviewInputWrap';

describe('ReviewInputWrap', () => {
  test('should update input fields and call onSubmit when submit button is clicked', () => {
    const mockOnSubmit = vi.fn();
    render(<ReviewInputWrap onSubmit={mockOnSubmit} />);

    const titleInput = screen.getByPlaceholderText('Title of movie');
    const commentInput = screen.getByPlaceholderText('Review of movie');
    const ratingDropdown = screen.getByText('5');
    const submitButton = screen.getByText('Submit');

    fireEvent.change(titleInput, { target: { value: 'Test Movie Title' } });
    fireEvent.change(commentInput, { target: { value: 'Test Movie Review' } });
    fireEvent.click(ratingDropdown);
    const ratingOption = screen.getByText('3');
    fireEvent.click(ratingOption);
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: 'Test Movie Title',
      comment: 'Test Movie Review',
      selected: '3',
    });
  });
});
