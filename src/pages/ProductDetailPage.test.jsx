import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { createTestStore } from '../app/store.js'
import ProductDetailPage from './ProductDetailPage.jsx'
import * as productsApi from '../shared/api/products.js'

vi.mock('../shared/api/products.js', () => ({
  getProducts: vi.fn(),
  getProductById: vi.fn(),
  getCommentsByPostId: vi.fn(),
}))

function renderProductDetailPage(initialRoute = '/product/1') {
  const store = createTestStore()
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  )
}

describe('ProductDetailPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows loading spinner while fetching product', () => {
    productsApi.getProductById.mockImplementation(() => new Promise(() => {}))
    productsApi.getCommentsByPostId.mockImplementation(() => new Promise(() => {}))
    renderProductDetailPage()
    expect(screen.getByRole('status', { name: 'Ürün detayı yükleniyor' })).toBeInTheDocument()
  })

  it('renders product detail and comments when fetch succeeds', async () => {
    const product = {
      id: 1,
      name: 'Detay Ürün',
      description: 'Ürün açıklaması',
      price: 42.99,
      imageUrl: 'https://example.com/detail.jpg',
    }
    const comments = [
      { id: 1, name: 'Kullanıcı', email: 'a@b.com', body: 'Güzel ürün' },
    ]
    productsApi.getProductById.mockResolvedValue(product)
    productsApi.getCommentsByPostId.mockResolvedValue(comments)
    renderProductDetailPage()
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Detay Ürün' })).toBeInTheDocument()
    })
    expect(screen.getByText('42.99 TL')).toBeInTheDocument()
    expect(screen.getByText('Ürün açıklaması')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Yorumlar' })).toBeInTheDocument()
    expect(screen.getByText('Güzel ürün')).toBeInTheDocument()
  })

  it('shows error and retry when product fetch fails', async () => {
    productsApi.getProductById.mockRejectedValue(new Error('Sunucu hatası'))
    productsApi.getCommentsByPostId.mockResolvedValue([])
    renderProductDetailPage()
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
    expect(screen.getByRole('button', { name: 'Tekrar dene' })).toBeInTheDocument()
  })

  it('shows link to list when product fetch fails', async () => {
    productsApi.getProductById.mockRejectedValue(new Error('404'))
    productsApi.getCommentsByPostId.mockResolvedValue([])
    renderProductDetailPage('/product/999')
    await waitFor(() => {
      expect(screen.getByRole('link', { name: 'Listeye dön' })).toBeInTheDocument()
    })
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })
})
