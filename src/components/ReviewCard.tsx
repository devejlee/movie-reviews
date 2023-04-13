interface ReviewCardProps {
  title: string
  comment: string
  score: number
}

const ReviewCard = ({ title, comment, score }: ReviewCardProps) => {
  return (
    <div className='reviewCard'>
      <h4>{title}</h4>
      <p>{comment}</p>
      <div className='scoreRow'>
        {Array.from({ length: score }, (_, i) => (
          <div key={i} className='circle'></div>
        ))}
      </div>
    </div>
  )
}

export { ReviewCard }