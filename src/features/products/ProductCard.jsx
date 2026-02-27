import { memo } from 'react'
import { Link } from 'react-router-dom'
import { Card, Image } from '../../shared/ui'

function ProductCard({ product }) {
  return (
    <Card
      as={Link}
      to={`/product/${product.id}`}
      isInteractive
      className="group flex h-full flex-col overflow-hidden no-underline text-inherit transition hover:-translate-y-0.5"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-neutral-100">
        {product.imageUrl && (
          <Image
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition group-hover:scale-105"
            width={400}
            height={400}
          />
        )}
      </div>
      <div className="flex min-h-[120px] flex-1 flex-col justify-between p-4">
        <h3 className="line-clamp-2 text-sm font-medium text-neutral-900">
          {product.name}
        </h3>
        <p className="mt-1 text-base font-semibold text-neutral-900">
          {product.price.toFixed(2)} TL
        </p>
        <p className="mt-0.5 line-clamp-2 text-xs text-neutral-500">
          {product.description}
        </p>
      </div>
    </Card>
  )
}

export default memo(ProductCard)
