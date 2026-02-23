import { createElement } from 'react'

function Card({
  as = 'div',
  isInteractive = false,
  className = '',
  children,
  ...rest
}) {
  const base =
    'rounded-lg border border-gray-200 bg-white shadow-sm transition'
  const interactive = isInteractive
    ? 'hover:border-gray-300 hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
    : ''
  return createElement(
    as,
    {
      className: `${base} ${interactive} ${className}`.trim(),
      ...rest,
    },
    children
  )
}

export default Card;
