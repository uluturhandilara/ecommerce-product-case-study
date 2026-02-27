import { memo } from 'react'
import { Heading, Spinner, ErrorMessage } from '../../shared/ui'
import CommentItem from './CommentItem.jsx'

function CommentList({ comments, status, error }) {
  return (
    <section aria-labelledby="comments-heading">
      <Heading
        level={3}
        id="comments-heading"
        className="text-lg font-medium text-neutral-900"
      >
        Yorumlar
      </Heading>
      {status === 'loading' && (
        <Spinner label="Yorumlar yükleniyor" className="py-4" />
      )}
      {status === 'failed' && (
        <ErrorMessage message={error} className="mt-2" />
      )}
      {status === 'succeeded' && (!comments?.length ? (
        <p className="mt-2 text-neutral-500">Henüz yorum yok.</p>
      ) : (
        <ul className="mt-2 space-y-3">
          {comments.map((c) => (
            <CommentItem key={c.id} comment={c} />
          ))}
        </ul>
      ))}
    </section>
  )
}

export default memo(CommentList)
