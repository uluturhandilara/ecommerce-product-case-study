import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../app/slices/productsSlice'
import {
  selectProducts,
  selectProductsStatus,
  selectProductsError,
} from '../app/slices/productsSlice'

function ProductListPage() {
  const dispatch = useDispatch()
  const products = useSelector(selectProducts)
  const status = useSelector(selectProductsStatus)
  const error = useSelector(selectProductsError)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  if (status === 'loading') {
    return (
      <p className="text-gray-600" role="status" aria-live="polite">
        Ürünler yükleniyor…
      </p>
    )
  }

  if (status === 'failed') {
    return (
      <div role="alert">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  return (
    <section aria-labelledby="product-list-heading">
      <h2 id="product-list-heading" className="sr-only">
        Ürün listesi
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <li key={product.id}>
            <Link
              to={`/product/${product.id}`}
              className="block rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:border-gray-300 hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <span className="font-medium text-gray-900">{product.name}</span>
              <span className="mt-2 block text-sm text-gray-600">
                {product.price.toFixed(2)} TL
              </span>
              <span className="mt-1 block line-clamp-2 text-sm text-gray-500">
                {product.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ProductListPage
