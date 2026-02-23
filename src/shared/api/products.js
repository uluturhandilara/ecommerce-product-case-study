import { getJSON } from './client.js'

export function getProductImageUrl(id, width = 400, height = 300) {
  return `https://picsum.photos/seed/${id}/${width}/${height}`
}

function mapPostToProduct(post) {
  return {
    id: post.id,
    name: post.title,
    description: post.body,
    price: (post.userId * 10 + post.id) * 1.5,
    imageUrl: getProductImageUrl(post.id),
  }
}

export async function getProducts() {
  const posts = await getJSON('/posts')
  return posts.map(mapPostToProduct)
}

export async function getProductById(id) {
  const post = await getJSON(`/posts/${id}`)
  return mapPostToProduct(post)
}

export async function getCommentsByPostId(postId) {
  return getJSON(`/posts/${postId}/comments`)
}
