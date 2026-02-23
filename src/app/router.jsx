import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'

const ProductListPage = lazy(() => import('../pages/ProductListPage.jsx'))
const ProductDetailPage = lazy(() => import('../pages/ProductDetailPage.jsx'))

function PageFallback() {
  return (
    <div
      className="flex items-center justify-center py-12 text-gray-500"
      role="status"
      aria-live="polite"
    >
      Sayfa yükleniyor…
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageFallback />}>
            <ProductListPage />
          </Suspense>
        ),
      },
      {
        path: 'product/:id',
        element: (
          <Suspense fallback={<PageFallback />}>
            <ProductDetailPage />
          </Suspense>
        ),
      },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
