import { ChangeEvent, useState } from 'react'
import { TextInput } from './TextInput'

const ReviewSearchWrap = () => {
  const [search, setSearch] = useState('')

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <div className='wrap reviewSearchWrap'>
      <h2>리뷰 검색</h2>
      <TextInput placeholderText='영화 제목을 입력해 주세요' value={search} onChange={handleSearchChange} />
    </div>
  )
}

export { ReviewSearchWrap }