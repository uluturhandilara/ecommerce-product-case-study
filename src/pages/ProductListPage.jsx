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
      <Heading level={2} id="product-list-heading" srOnly>
        Ürün listesi
      </Heading>
      <ProductList products={products} />
    </section>
  )
}

export default ProductListPage
