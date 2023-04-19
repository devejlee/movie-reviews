import { ChangeEvent, useState } from 'react'
import { StyledWrap } from './styles'
import { TextInput } from '../TextInput'

interface ReviewSearchWrapProps {
  onSearch: (text: string) => void
}

const ReviewSearchWrap = ({ onSearch }: ReviewSearchWrapProps) => {
  const [search, setSearch] = useState('')

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    onSearch(e.target.value)
  }

  return (
    <StyledWrap>
      <h2>Search</h2>
      <TextInput placeholderText='Search movie title' value={search} onChange={handleSearchChange} />
    </StyledWrap>
  )
}

export { ReviewSearchWrap }