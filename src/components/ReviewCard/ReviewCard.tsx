import { StyledReviewCard, StyledScoreRow, StyledCircle } from './styles'

interface ReviewCardProps {
  title: string
  comment: string
  score: number
}

const ReviewCard = ({ title, comment, score }: ReviewCardProps) => {
  return (
    <StyledReviewCard data-testid='review-card'>
      <h4>{title}</h4>
      <p>{comment}</p>
      <StyledScoreRow>
        {Array.from({ length: score }, (_, i) => (
          <StyledCircle key={i} className='circle' data-testid='circle'></StyledCircle>
        ))}
      </StyledScoreRow>
    </StyledReviewCard>
  )
}

export { ReviewCard }