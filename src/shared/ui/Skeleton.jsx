function Skeleton({ className = '', ...rest }) {
  return (
    <div
      className={`animate-pulse rounded bg-gray-200 ${className}`.trim()}
      aria-hidden="true"
      {...rest}
    />
  )
}

export default Skeleton
