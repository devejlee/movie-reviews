import { ReviewCardsWrap } from './components/ReviewCardsWrap'
import { ReviewInputWrap } from './components/ReviewInputWrap'
import { ReviewSearchWrap } from './components/ReviewSearchWrap'
import { useState } from 'react'
import { initialData } from './data'
import { getLocalStorageItem, sortMovies } from './utils'

const App = () => {
  const reviews = getLocalStorageItem('reviews')
  const [data, setData] = useState(reviews ?? initialData)
  const sortedData = sortMovies(data)

  const handleData = () => {
    setData([])
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
