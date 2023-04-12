import { TextInput } from './TextInput'

const ReviewInputWrap = () => {
  return (
    <div className='wrap reviewInputWrap'>
      <h2>신규 리뷰 등록</h2>
      <h3>영화 제목</h3>
      <TextInput placeholderText='제목을 입력해 주세요' />
      <h3>한줄평</h3>
      <TextInput placeholderText='내용을 입력해 주세요' />
    </div>
  )
}

export { ReviewInputWrap }