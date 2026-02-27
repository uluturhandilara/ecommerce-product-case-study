import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../app/slices/productsSlice'
import {
  selectProducts,
  selectProductsStatus,
  selectProductsError,
} from '../app/slices/productsSlice'
import { Spinner, ErrorMessage, Heading } from '../shared/ui'
import { ProductList } from '../features/products'

function ProductListPage() {
  const dispatch = useDispatch()
  const products = useSelector(selectProducts)
  const status = useSelector(selectProductsStatus)
  const error = useSelector(selectProductsError)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  if (status === 'loading') {
    return <Spinner label="Ürünler yükleniyor" />
  }

  if (status === 'failed') {
    return (
      <ErrorMessage
        message={error}
        onRetry={() => dispatch(fetchProducts())}
      />
    )
  }

  return (
    <section aria-labelledby="product-list-heading">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Heading
          level={2}
          id="product-list-heading"
          className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl"
        >
          Tüm Ürünler
        </Heading>
        <div className="flex gap-2">
          <span className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white">
            Tümü
          </span>
          <span className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700">
            Yeni
          </span>
          <span className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700">
            Popüler
          </span>
        </div>
      </div>
      <ProductList products={products} />
    </section>
  )
}

export default ProductListPage
