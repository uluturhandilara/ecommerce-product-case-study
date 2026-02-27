function Button({
  variant = 'primary',
  type = 'button',
  className = '',
  children,
  ...rest
}) {
  const base =
    'inline-flex items-center justify-center rounded-lg border px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    primary:
      'border-transparent bg-neutral-900 text-white hover:bg-neutral-800 focus:ring-neutral-500',
    secondary:
      'border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 focus:ring-neutral-500',
  }
  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
