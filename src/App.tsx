import { useState } from 'react'
import { ReviewCardsWrap } from './components/ReviewCardsWrap'
import { ReviewInputWrap } from './components/ReviewInputWrap'
import { ReviewSearchWrap } from './components/ReviewSearchWrap'
import { initialData } from './data'
import { Movie, Review } from './types'
import { getLocalStorageItem, setLocalStorageItem, sortMovies } from './utils'

const App = () => {
  const reviews = getLocalStorageItem('reviews')
  const [data, setData] = useState<Movie[]>(reviews ?? initialData)
  const sortedData = sortMovies(data)

  const handleData = (review: Review) => {
    if (!review.title || !review.comment) return
    const newData = [...data, {
      id: data.length,
      title: review.title,
      comment: review.comment,
      score: Number(review.selected)
    }]
    setLocalStorageItem('reviews', newData)
    setData(newData)
  }

  return (
    <div className='app'>
      <ReviewInputWrap onSubmit={handleData} />
      <ReviewSearchWrap />
      <ReviewCardsWrap movies={sortedData} />
    </div>
  )
}

export default App
