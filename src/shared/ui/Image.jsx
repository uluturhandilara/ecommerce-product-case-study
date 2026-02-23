function Image({ src, alt, loading = 'lazy', className = '', ...rest }) {
  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      className={className}
      {...rest}
    />
  )
}

export default Image
