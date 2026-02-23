import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductById } from '../app/slices/productsSlice'
import { fetchCommentsByPostId } from '../app/slices/commentsSlice'
import {
  selectProductById,
  selectProductsStatus,
  selectProductsError,
} from '../app/slices/productsSlice'
import {
  selectCommentsByPostId,
  selectCommentsStatus,
  selectCommentsError,
} from '../app/slices/commentsSlice'
import { Spinner, ErrorMessage, Image, Button } from '../shared/ui'
import { ProductDetail, CommentList } from '../features/productDetail'

function ProductDetailPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const product = useSelector((state) => selectProductById(state, Number(id)))
  const productsStatus = useSelector(selectProductsStatus)
  const productsError = useSelector(selectProductsError)
  const comments = useSelector((state) =>
    selectCommentsByPostId(state, Number(id))
  )
  const commentsStatus = useSelector((state) =>
    selectCommentsStatus(state, Number(id))
  )
  const commentsError = useSelector((state) =>
    selectCommentsError(state, Number(id))
  )

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(Number(id)))
      dispatch(fetchCommentsByPostId(Number(id)))
    }
  }, [dispatch, id])

  if (productsStatus === 'loading' && !product) {
    return <Spinner label="Ürün detayı yükleniyor" />
  }

  if (productsStatus === 'failed' && !product) {
    return (
      <>
        <ErrorMessage
          message={productsError}
          onRetry={() => {
            dispatch(fetchProductById(Number(id)))
            dispatch(fetchCommentsByPostId(Number(id)))
          }}
        />
        <Link to="/" className="mt-4 inline-block text-gray-600 underline">
          Listeye dön
        </Link>
      </>
    )
  }

  if (!product) {
    return (
      <p className="text-gray-600">
        Ürün bulunamadı.{' '}
        <Link to="/" className="underline">
          Listeye dön
        </Link>
      </p>
    )
  }

  return (
    <article className="space-y-8">
      <nav aria-label="Breadcrumb" className="text-sm">
        <ol className="flex items-center gap-2 text-gray-500">
          <li>
            <Link
              to="/"
              className="text-emerald-700 hover:text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Anasayfa
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-gray-900">{product.name}</li>
        </ol>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-3">
          {product.imageUrl && (
            <Image
              src={product.imageUrl}
              alt={product.name}
              className="w-full rounded-xl shadow-md aspect-square object-cover"
              width={600}
              height={600}
            />
          )}
          {product.imageUrl && (
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <button
                  key={i}
                  type="button"
                  className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  aria-label={`Ürün görseli ${i}`}
                >
                  <Image
                    src={product.imageUrl}
                    alt=""
                    className="h-full w-full object-cover"
                    width={64}
                    height={64}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <ProductDetail product={product} />
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="primary" type="button">
              Sepete Ekle
            </Button>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Listeye Dön
            </Link>
          </div>
          <div className="mt-6 space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
            <p className="flex items-center gap-2">
              <span aria-hidden="true">🚚</span>
              <span>Ücretsiz teslimat — Siparişler 2–4 iş günü içinde kargoya verilir.</span>
            </p>
            <p className="flex items-center gap-2">
              <span aria-hidden="true">↩️</span>
              <span>30 gün iade — Memnun kalmazsanız ücretsiz iade.</span>
            </p>
          </div>
        </div>
      </div>

      <CommentList
        comments={comments}
        status={commentsStatus}
        error={commentsError}
      />
    </article>
  )
}

export default ProductDetailPage
