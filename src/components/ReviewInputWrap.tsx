import { ChangeEvent, useState } from 'react'
import { Dropdown } from './Dropdown'
import { TextInput } from './TextInput'
import { generateOptions } from '../utils'

interface ReviewInputWrap {
  onSubmit: () => void
}

const ReviewInputWrap = ({ onSubmit }: ReviewInputWrap) => {
  const [title, setTitle] = useState('')
  const [comment, setComment] = useState('')
  const [selected, setSelected] = useState('5')

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value)
  }

  const handleSelected = (option: string) => {
    setSelected(option)
  }

  return (
    <div className='wrap reviewInputWrap'>
      <h2>신규 리뷰 등록</h2>
      <h3>영화 제목</h3>
      <TextInput placeholderText='제목을 입력해 주세요' value={title} onChange={handleTitleChange} />
      <h3>한줄평</h3>
      <TextInput placeholderText='내용을 입력해 주세요' value={comment} onChange={handleCommentChange} />
      <h3>별점</h3>
      <Dropdown options={generateOptions(5)} selected={selected} onSelect={handleSelected} />
      <button className='inputBtn' onClick={() => onSubmit()}>등록</button>
    </div>
  )
}

export { ReviewInputWrap }