import { ReviewCard } from './ReviewCard'
import { Movie } from '../types'

interface ReviewCardsWrapProps {
  movies: Movie[]
}

const ReviewCardsWrap = ({ movies }: ReviewCardsWrapProps) => {
  return (
    <div className='wrap reviewCardsWrap'>
      <h2>리뷰 내역</h2>
      {movies.map(movie => {
        return (
          <ReviewCard key={movie.id} title={movie.title} comment={movie.comment} score={movie.score} />
        )
      })}
    </div>
  )
}

export { ReviewCardsWrap }