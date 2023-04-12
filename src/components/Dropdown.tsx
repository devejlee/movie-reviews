import { useRef, useState } from 'react'

interface DropdownProps {
  options: string[]
  selectedOption: string
}

const Dropdown = ({ options, selectedOption }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(selectedOption)
  const dropdownRef = useRef(null)

  const filteredOptions = options.filter(option => option !== selected)

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelected(option);
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