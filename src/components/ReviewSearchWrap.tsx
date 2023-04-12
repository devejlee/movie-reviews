import { TextInput } from './TextInput'

const ReviewSearchWrap = () => {
  return (
    <div className='wrap reviewSearchWrap'>
      <h2>리뷰 검색</h2>
      <TextInput placeholderText='영화 제목을 입력해 주세요' />
    </div>
  )
}

export { ReviewSearchWrap }