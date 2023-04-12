import { useState, ChangeEvent } from 'react';

interface TextInputProps {
  placeholderText: string
}

const TextInput = ({ placeholderText }: TextInputProps) => {
  const [textValue, setTextValue] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value)
  }

  return (
    <input placeholder={placeholderText} type="text" value={textValue} onChange={handleChange} />
  )
}

export { TextInput }