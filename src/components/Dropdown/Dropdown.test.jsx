import { render, fireEvent } from '@testing-library/react';
import { Dropdown } from './Dropdown';

describe('Dropdown', () => {
  test('opens the menu when the selected div is clicked', () => {
    const options = ['Option 1', 'Option 2', 'Option 3'];
    const selected = 'Option 1';
    const onSelect = () => {};
    const { getByTestId } = render(
      <Dropdown options={options} selected={selected} onSelect={onSelect} />
    );
    
    // Check if the dropdown menu is initially closed
    expect(() => getByTestId('dropdown-menu')).toThrow();

    // Click on the selected div
    fireEvent.click(getByTestId('dropdown-selected'));

    // Check if the dropdown menu is now open
    expect(() => getByTestId('dropdown-menu')).not.toThrow();
  });
});
