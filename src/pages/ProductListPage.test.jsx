import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { createTestStore } from '../app/store.js'
import ProductListPage from './ProductListPage.jsx'
import * as productsApi from '../shared/api/products.js'

vi.mock('../shared/api/products.js', () => ({
  getProducts: vi.fn(),
  getProductById: vi.fn(),
  getCommentsByPostId: vi.fn(),
}))

function renderProductListPage() {
  const store = createTestStore()
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <ProductListPage />
      </MemoryRouter>
    </Provider>
  )
}

describe('ProductListPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows loading spinner while fetching products', () => {
    productsApi.getProducts.mockImplementation(() => new Promise(() => {}))
    renderProductListPage()
    expect(screen.getByRole('status', { name: 'Ürünler yükleniyor' })).toBeInTheDocument()
  })

  it('renders product list when fetch succeeds', async () => {
    const mockProducts = [
      {
        id: 1,
        name: 'Ürün A',
        description: 'Açıklama A',
        price: 15.5,
        imageUrl: 'https://example.com/a.jpg',
      },
    ]
    productsApi.getProducts.mockResolvedValue(mockProducts)
    renderProductListPage()
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Tüm Ürünler' })).toBeInTheDocument()
    })
    expect(screen.getByText('Ürün A')).toBeInTheDocument()
    expect(screen.getByText('15.50 TL')).toBeInTheDocument()
  })

  it('shows error and retry when fetch fails', async () => {
    productsApi.getProducts.mockRejectedValue(new Error('Ağ hatası'))
    renderProductListPage()
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/ağ hatası|ürünler yüklenemedi/i)
    })
    expect(screen.getByRole('button', { name: 'Tekrar dene' })).toBeInTheDocument()
  })

  it('retry button dispatches fetch again', async () => {
    const user = (await import('@testing-library/user-event')).default.setup()
    productsApi.getProducts
      .mockRejectedValueOnce(new Error('Hata'))
      .mockResolvedValueOnce([{ id: 1, name: 'Ürün', description: 'd', price: 1, imageUrl: null }])
    renderProductListPage()
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Tekrar dene' })).toBeInTheDocument()
    })
    await user.click(screen.getByRole('button', { name: 'Tekrar dene' }))
    await waitFor(() => {
      expect(screen.getByText('Ürün')).toBeInTheDocument()
    })
    expect(productsApi.getProducts).toHaveBeenCalledTimes(2)
  })
})
