import { memo } from 'react'

function CommentItem({ comment }) {
  return (
    <li className="rounded-xl border border-neutral-200 bg-neutral-50 p-3">
      <span className="font-medium text-neutral-800">{comment.name}</span>
      <p className="mt-1 text-sm text-neutral-600">{comment.body}</p>
    </li>
  )
}

export default memo(CommentItem)
