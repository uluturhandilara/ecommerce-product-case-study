import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import { Spinner } from '../shared/ui/index.js'

const ProductListPage = lazy(() => import('../pages/ProductListPage.jsx'))
const ProductDetailPage = lazy(() => import('../pages/ProductDetailPage.jsx'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Spinner label="Sayfa yükleniyor" />}>
            <ProductListPage />
          </Suspense>
        ),
      },
      {
        path: 'product/:id',
        element: (
          <Suspense fallback={<Spinner label="Sayfa yükleniyor" />}>
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
