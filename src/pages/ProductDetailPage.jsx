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
import { Spinner, ErrorMessage } from '../shared/ui'
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
    <article className="space-y-6">
      <Link
        to="/"
        className="inline-block text-gray-600 underline focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >
        ← Listeye dön
      </Link>

      <ProductDetail product={product} />

      <CommentList
        comments={comments}
        status={commentsStatus}
        error={commentsError}
      />
    </article>
  )
}

export default ProductDetailPage
