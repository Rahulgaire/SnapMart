import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ProductsProvider from './context/ProductsContext.jsx'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <ProductsProvider>
    <BrowserRouter>
    <App />
    <Toaster />
    </BrowserRouter>
  </ProductsProvider>
  </StrictMode>,
)
