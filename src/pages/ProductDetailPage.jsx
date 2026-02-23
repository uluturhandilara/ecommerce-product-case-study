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
    return (
      <p className="text-gray-600" role="status" aria-live="polite">
        Ürün detayı yükleniyor…
      </p>
    )
  }

  if (productsStatus === 'failed' && !product) {
    return (
      <div role="alert">
        <p className="text-red-600">{productsError}</p>
        <Link to="/" className="mt-2 inline-block text-gray-600 underline">
          Listeye dön
        </Link>
      </div>
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
        <h2 className="text-2xl font-semibold text-gray-900">{product.name}</h2>
        <p className="mt-1 text-lg text-gray-700">
          {product.price.toFixed(2)} TL
        </p>
      </header>

      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="rounded-lg border border-gray-200 object-cover"
          width={400}
          height={300}
          loading="lazy"
        />
      )}

      <p className="text-gray-600">{product.description}</p>

      <section aria-labelledby="comments-heading">
        <h3 id="comments-heading" className="text-lg font-medium text-gray-900">
          Yorumlar
        </h3>
        {commentsStatus === 'loading' && (
          <p className="mt-2 text-gray-500" role="status" aria-live="polite">
            Yorumlar yükleniyor…
          </p>
        )}
        {commentsStatus === 'failed' && (
          <p className="mt-2 text-red-600" role="alert">
            {commentsError}
          </p>
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
