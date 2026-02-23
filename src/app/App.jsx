import { Link, Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-emerald-800 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-semibold">
            <Link
              to="/"
              className="text-white no-underline hover:text-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:ring-offset-2 focus:ring-offset-emerald-800"
            >
              Shopcart
            </Link>
          </h1>
          <nav aria-label="Ana navigasyon">
            <Link
              to="/"
              className="text-white/90 no-underline hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:ring-offset-2 focus:ring-offset-emerald-800"
            >
              Ürünler
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}

export default App
