function Heading({ level = 2, srOnly = false, className = '', children, id }) {
  const Tag = `h${Math.min(6, Math.max(1, level))}`
  const classes = srOnly ? `sr-only ${className}` : className
  return (
    <Tag id={id} className={classes.trim()}>
      {children}
    </Tag>
  )
}

export default Heading
