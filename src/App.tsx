import { ReviewCardsWrap } from './components/ReviewCardsWrap'
import { ReviewInputWrap } from './components/ReviewInputWrap'
import { ReviewSearchWrap } from './components/ReviewSearchWrap'

const App = () => {

  return (
    <div className='app'>
      <ReviewInputWrap />
      <ReviewSearchWrap />
      <ReviewCardsWrap />
    </div>
  )
}

export default App
