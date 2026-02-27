import { createElement } from 'react'

function Card({
  as = 'div',
  isInteractive = false,
  className = '',
  children,
  ...rest
}) {
  const base =
    'rounded-2xl border border-neutral-200 bg-white shadow-sm transition'
  const interactive = isInteractive
    ? 'hover:border-neutral-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900'
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
