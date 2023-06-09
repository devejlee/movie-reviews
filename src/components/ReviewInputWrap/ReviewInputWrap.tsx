import { ChangeEvent, useState } from 'react'
import { StyledWrap, StyledButton } from './styles'
import { Dropdown } from '../Dropdown/Dropdown'
import { TextInput } from '../TextInput/TextInput'
import { Review } from '../../types'
import { generateOptions } from '../../utils'

interface ReviewInputWrap {
  onSubmit: ({ title, comment, selected }: Review) => void
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
    <StyledWrap>
      <h2>New Movie Review</h2>
      <h3>Movie Title</h3>
      <TextInput placeholderText='Title of movie' value={title} onChange={handleTitleChange} />
      <h3>Review</h3>
      <TextInput placeholderText='Review of movie' value={comment} onChange={handleCommentChange} />
      <h3>Rating</h3>
      <Dropdown options={generateOptions(5)} selected={selected} onSelect={handleSelected} />
      <StyledButton onClick={() => onSubmit({ title, comment, selected })}>Submit</StyledButton>
    </StyledWrap>
  )
}

export { ReviewInputWrap }