import { useRef, useState } from 'react'
import useClickAway from '../../hooks/useClickAway'
import { StyledDropdown, StyledDropdownSelected, StyledDropdownMenu, StyledDropdownItem } from './styles'

interface DropdownProps {
  options: string[]
  selected: string
  onSelect: (option: string) => void
}

const Dropdown = ({ options, selected, onSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const filteredOptions = options?.filter(option => option !== selected)

  useClickAway(dropdownRef, () => {
    setIsOpen(false);
  });

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <StyledDropdown ref={dropdownRef}>
      <StyledDropdownSelected onClick={handleDropdownClick}>
        {selected}
      </StyledDropdownSelected>
      {isOpen && (
        <StyledDropdownMenu>
          {filteredOptions.map((option) => (
            <StyledDropdownItem
              key={option}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </StyledDropdownItem>
          ))}
        </StyledDropdownMenu>
      )}
    </StyledDropdown>
  )
}

export { Dropdown }