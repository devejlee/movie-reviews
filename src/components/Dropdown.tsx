import { useRef, useState } from 'react'
import useClickAway from '../hooks/useClickAway'

interface DropdownProps {
  options: string[]
  selected: string
  onSelect: (option: string) => void
}

const Dropdown = ({ options, selected, onSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const filteredOptions = options.filter(option => option !== selected)

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
    <div className="dropdown" ref={dropdownRef}>
      <div className="dropdownSelected" onClick={handleDropdownClick}>
        {selected}
      </div>
      {isOpen && (
        <ul className="dropdownMenu">
          {filteredOptions.map((option) => (
            <li
              className="dropdownItem"
              key={option}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export { Dropdown }