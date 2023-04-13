import { ReviewCard } from './ReviewCard'
import { initialData } from '../data'
import { sortMovies } from '../utils';

const sortedData = sortMovies(initialData)

const ReviewCardsWrap = () => {
  return (
    <div className='wrap reviewCardsWrap'>
      <h2>리뷰 내역</h2>
      {sortedData.map(movie => {
        return (
          <ReviewCard key={movie.id} title={movie.title} comment={movie.comment} score={movie.score} />
        )
      })}
    </div>
  )
}

export { ReviewCardsWrap }