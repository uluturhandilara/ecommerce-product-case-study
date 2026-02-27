import { Link, Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <h1 className="text-lg font-semibold tracking-tight">
            <Link
              to="/"
              className="text-neutral-900 no-underline hover:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2"
            >
              Shopcart
            </Link>
          </h1>
          <nav aria-label="Ana navigasyon">
            <Link
              to="/"
              className="text-neutral-600 no-underline hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2"
            >
              Ürünler
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <Outlet />
      </main>
    </div>
  )
}

export default App
