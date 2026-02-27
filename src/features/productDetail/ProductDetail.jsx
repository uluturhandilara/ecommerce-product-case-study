import { memo } from 'react'
import { Heading } from '../../shared/ui'

function ProductDetail({ product }) {
  return (
    <div className="space-y-4">
      <Heading level={2} className="text-2xl font-bold tracking-tight text-neutral-900">
        {product.name}
      </Heading>
      <p className="text-neutral-600">{product.description}</p>
      <p className="text-2xl font-bold text-neutral-900">
        {product.price.toFixed(2)} TL
      </p>
    </div>
  )
}

export default memo(ProductDetail)
