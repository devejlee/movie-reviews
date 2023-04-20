import { render, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { ReviewSearchWrap } from './ReviewSearchWrap';

describe('ReviewSearchWrap', () => {
  test('should call onSearch with search input value', () => {
    const mockOnSearch = vi.fn();
    const { getByPlaceholderText } = render(<ReviewSearchWrap onSearch={mockOnSearch} />);

    const searchInput = getByPlaceholderText('Search movie title');
    fireEvent.change(searchInput, { target: { value: 'Test Movie Title' } });

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('Test Movie Title');
  });
});
