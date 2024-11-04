const formatPrice = price => {
  if (typeof price !== 'number') return NaN
  return parseFloat(price).toFixed(2)
}

export default formatPrice
