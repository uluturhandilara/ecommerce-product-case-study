import { memo } from 'react'
import ProductCard from './ProductCard.jsx'

function ProductList({ products }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  )
}

export default memo(ProductList)
