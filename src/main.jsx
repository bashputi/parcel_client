import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './AuthProvider'
import myRouter from './router/Router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
     <QueryClientProvider client={queryClient}>
      <RouterProvider router={myRouter} />
    </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
