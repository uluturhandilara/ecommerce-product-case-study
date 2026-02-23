import { memo } from 'react'
import { Heading, Image } from '../../shared/ui'

function ProductDetail({ product }) {
  return (
    <>
      <header>
        <Heading level={2} className="text-2xl font-semibold text-gray-900">
          {product.name}
        </Heading>
        <p className="mt-1 text-lg text-gray-700">
          {product.price.toFixed(2)} TL
        </p>
      </header>

      {product.imageUrl && (
        <Image
          src={product.imageUrl}
          alt={product.name}
          className="rounded-lg border border-gray-200 object-cover"
          width={400}
          height={300}
        />
      )}

      <p className="text-gray-600">{product.description}</p>
    </>
  )
}

export default memo(ProductDetail)
