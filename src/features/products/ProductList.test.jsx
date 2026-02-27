import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ProductList from './ProductList.jsx'

function renderWithRouter(ui) {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

describe('ProductList', () => {
  const products = [
    {
      id: 1,
      name: 'Ürün 1',
      description: 'Açıklama 1',
      price: 10,
      imageUrl: 'https://example.com/1.jpg',
    },
    {
      id: 2,
      name: 'Ürün 2',
      description: 'Açıklama 2',
      price: 20,
      imageUrl: null,
    },
  ]

  it('renders all product cards', () => {
    renderWithRouter(<ProductList products={products} />)
    expect(screen.getByText('Ürün 1')).toBeInTheDocument()
    expect(screen.getByText('Ürün 2')).toBeInTheDocument()
    expect(screen.getByText('10.00 TL')).toBeInTheDocument()
    expect(screen.getByText('20.00 TL')).toBeInTheDocument()
  })

  it('renders empty list when products is empty', () => {
    const { container } = renderWithRouter(<ProductList products={[]} />)
    const list = container.querySelector('ul')
    expect(list).toBeInTheDocument()
    expect(list?.children).toHaveLength(0)
  })

  it('renders list with correct number of items', () => {
    const { container } = renderWithRouter(<ProductList products={products} />)
    const list = container.querySelector('ul')
    expect(list?.children).toHaveLength(2)
  })
})
