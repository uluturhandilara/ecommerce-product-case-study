import { memo } from 'react'
import { Link } from 'react-router-dom'
import { Card, Image } from '../../shared/ui'

function ProductCard({ product }) {
  return (
    <Card
      as={Link}
      to={`/product/${product.id}`}
      isInteractive
      className="block p-4 no-underline text-inherit"
    >
      {product.imageUrl && (
        <Image
          src={product.imageUrl}
          alt={product.name}
          className="mb-3 h-40 w-full rounded object-cover"
          width={400}
          height={160}
        />
      )}
      <span className="font-medium text-gray-900">{product.name}</span>
      <span className="mt-2 block text-sm text-gray-600">
        {product.price.toFixed(2)} TL
      </span>
      <span className="mt-1 block line-clamp-2 text-sm text-gray-500">
        {product.description}
      </span>
    </Card>
  )
}

export default memo(ProductCard)
