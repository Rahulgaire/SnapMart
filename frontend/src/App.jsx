import React from 'react'
import { NavbarDemo } from './common/NavbarDemo'
import { Footer } from './common/Footer'
import { Routes, Route } from 'react-router-dom' // ✅ FIXED

import Features from './Pages/Features'
import Pricing from './Pages/Pricing'
import Home from './Pages/Home'
import Modal from './Pages/Modal'
import Contact from './Pages/Contact'
import AllProducts from './Pages/AllProducts'
import ProductDetails from './Pages/ProductDetails'

const App = () => {
  return (
    <div>
      <NavbarDemo />

      {/* ✅ Use Routes instead of Router */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<AllProducts />} />
        <Route path='/products/:id' element={<ProductDetails />} />
        <Route path='/modal' element={<Modal />} />
        <Route path='/features' element={<Features />} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
