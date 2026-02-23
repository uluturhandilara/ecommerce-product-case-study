import { createElement } from 'react'

function Card({
  as = 'div',
  isInteractive = false,
  className = '',
  children,
  ...rest
}) {
  const base =
    'rounded-xl border border-gray-200 bg-white shadow-md transition'
  const interactive = isInteractive
    ? 'hover:border-gray-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500'
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
