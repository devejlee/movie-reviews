import { StyledWrap } from './styles'
import { ReviewCard } from '../ReviewCard/ReviewCard'
import { Movie } from '../../types'

interface ReviewCardsWrapProps {
  movies: Movie[]
}

const ReviewCardsWrap = ({ movies }: ReviewCardsWrapProps) => {
  return (
    <StyledWrap data-testid='review-card-wrap'>
      <h2>All Reviews</h2>
      {movies.map(movie => {
        return (
          <ReviewCard key={movie.id} title={movie.title} comment={movie.comment} score={movie.score} />
        )
      })}
    </StyledWrap>
  )
}

export { ReviewCardsWrap }