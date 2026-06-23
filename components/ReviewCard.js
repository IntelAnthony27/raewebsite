export default function ReviewCard({ review }) {
  const { name, initials, rating, text, product, date, location } = review

  return (
    <article className="review-card">
      {/* Stars */}
      <div className="stars" aria-label={`${rating} out of 5 stars`}>
        {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
      </div>

      {/* Quote */}
      <blockquote className="review-text">"{text}"</blockquote>

      {/* Author */}
      <div className="review-author">
        <div className="review-avatar" aria-hidden="true">{initials}</div>
        <div>
          <p className="review-name">{name}</p>
          <p className="review-date">
            {location && `${location} · `}{date}
          </p>
        </div>
      </div>

      {/* Product */}
      {product && (
        <p className="review-product">Purchased: {product}</p>
      )}
    </article>
  )
}
