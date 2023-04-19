import { ChangeEvent } from 'react';

interface TextInputProps {
  placeholderText: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const TextInput = ({ placeholderText, value, onChange }: TextInputProps) => {
  return (
    <input placeholder={placeholderText} type="text" value={value} onChange={onChange} />
  )
}

export { TextInput }