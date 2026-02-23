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
import { Spinner, ErrorMessage, Image, Heading } from '../shared/ui'

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
    <article className="space-y-6">
      <Link
        to="/"
        className="inline-block text-gray-600 underline focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >
        ← Listeye dön
      </Link>

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

      <section aria-labelledby="comments-heading">
        <Heading
          level={3}
          id="comments-heading"
          className="text-lg font-medium text-gray-900"
        >
          Yorumlar
        </Heading>
        {commentsStatus === 'loading' && (
          <Spinner label="Yorumlar yükleniyor" className="py-4" />
        )}
        {commentsStatus === 'failed' && (
          <ErrorMessage message={commentsError} className="mt-2" />
        )}
        {commentsStatus === 'succeeded' && (
          <ul className="mt-2 space-y-3">
            {comments.map((c) => (
              <li
                key={c.id}
                className="rounded border border-gray-100 bg-gray-50 p-3"
              >
                <span className="font-medium text-gray-800">{c.name}</span>
                <p className="mt-1 text-sm text-gray-600">{c.body}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </article>
  )
}

export default ProductDetailPage
