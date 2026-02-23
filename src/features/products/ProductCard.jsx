import { memo } from 'react'
import { Link } from 'react-router-dom'
import { Card, Image } from '../../shared/ui'

function ProductCard({ product }) {
  return (
    <Card
      as={Link}
      to={`/product/${product.id}`}
      isInteractive
      className="block p-0 no-underline text-inherit transition hover:-translate-y-0.5"
    >
      {product.imageUrl && (
        <Image
          src={product.imageUrl}
          alt={product.name}
          className="h-48 w-full rounded-t-xl object-cover"
          width={400}
          height={192}
        />
      )}
      <div className="p-5">
        <span className="line-clamp-2 font-semibold text-gray-900">
          {product.name}
        </span>
        <span className="mt-2 block text-lg font-semibold text-emerald-700">
          {product.price.toFixed(2)} TL
        </span>
        <span className="mt-1 block line-clamp-2 text-sm text-gray-500">
          {product.description}
        </span>
      </div>
    </Card>
  )
}

export default memo(ProductCard)
