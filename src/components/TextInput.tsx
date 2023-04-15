import { ChangeEvent } from 'react';

interface TextInputProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholderText: string
}

const TextInput = ({ placeholderText, value, onChange }: TextInputProps) => {
  return (
    <input placeholder={placeholderText} type="text" value={value} onChange={onChange} />
  )
}

export { TextInput }