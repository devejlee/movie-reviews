import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { TextInput } from './TextInput';

describe('TextInput', () => {
  test('should update input value when user types', async () => {
    const mockOnChange = vi.fn();
    const { getByPlaceholderText } = render(
      <TextInput placeholderText="Test Placeholder" value="" onChange={mockOnChange} />
    );

    const inputElement = getByPlaceholderText('Test Placeholder') as HTMLInputElement;
    await userEvent.type(inputElement, 'Test Input Value');

    expect(mockOnChange).toHaveBeenCalledTimes(16);
  });
});
