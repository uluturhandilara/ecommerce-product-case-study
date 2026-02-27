import { memo } from 'react'
import ProductCard from './ProductCard.jsx'

function ProductList({ products }) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <li key={product.id} className="flex">
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  )
}

export default memo(ProductList)
