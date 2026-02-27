import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ProductCard from './ProductCard.jsx'

function renderWithRouter(ui) {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

describe('ProductCard', () => {
  const product = {
    id: 1,
    name: 'Test Ürün',
    description: 'Kısa açıklama',
    price: 99.99,
    imageUrl: 'https://example.com/img.jpg',
  }

  it('renders product name, price and description', () => {
    renderWithRouter(<ProductCard product={product} />)
    expect(screen.getByText('Test Ürün')).toBeInTheDocument()
    expect(screen.getByText('99.99 TL')).toBeInTheDocument()
    expect(screen.getByText('Kısa açıklama')).toBeInTheDocument()
  })

  it('links to product detail page', () => {
    renderWithRouter(<ProductCard product={product} />)
    const link = screen.getByRole('link', { name: /test ürün/i })
    expect(link).toHaveAttribute('href', '/product/1')
  })

  it('renders image with alt text', () => {
    renderWithRouter(<ProductCard product={product} />)
    const img = screen.getByRole('img', { name: 'Test Ürün' })
    expect(img).toHaveAttribute('src', product.imageUrl)
  })

  it('does not render image when imageUrl is missing', () => {
    const productNoImage = { ...product, imageUrl: null }
    renderWithRouter(<ProductCard product={productNoImage} />)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })
})
