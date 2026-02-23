import { memo } from 'react'

function CommentItem({ comment }) {
  return (
    <li className="rounded border border-gray-100 bg-gray-50 p-3">
      <span className="font-medium text-gray-800">{comment.name}</span>
      <p className="mt-1 text-sm text-gray-600">{comment.body}</p>
    </li>
  )
}

export default memo(CommentItem)
