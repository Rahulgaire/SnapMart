import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ProductsProvider from './context/ProductsContext.jsx'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthProvider.jsx'
createRoot(document.getElementById('root')).render(
        <BrowserRouter>
    <AuthProvider>
      <ProductsProvider>
          <App />
          <Toaster />
      </ProductsProvider>
    </AuthProvider>
        </BrowserRouter>
)
