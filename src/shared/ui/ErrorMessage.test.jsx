import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ErrorMessage from './ErrorMessage.jsx'

describe('ErrorMessage', () => {
  it('renders message', () => {
    render(<ErrorMessage message="Bir hata oluştu" />)
    expect(screen.getByRole('alert')).toHaveTextContent('Bir hata oluştu')
  })

  it('renders retry button when onRetry provided', () => {
    const onRetry = vi.fn()
    render(<ErrorMessage message="Hata" onRetry={onRetry} />)
    const button = screen.getByRole('button', { name: 'Tekrar dene' })
    expect(button).toBeInTheDocument()
    screen.getByRole('button', { name: 'Tekrar dene' }).click()
    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it('does not render retry button when onRetry is not provided', () => {
    render(<ErrorMessage message="Hata" />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
