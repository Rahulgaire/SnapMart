import React from 'react'
import { NavbarDemo } from './common/NavbarDemo'
import { Footer } from './common/Footer'
import { Routes, Route, useLocation } from 'react-router-dom' // ✅ FIXED

import Features from './Pages/Features'
import Pricing from './Pages/Pricing'
import Home from './Pages/Home'
import Modal from './Pages/Modal'
import Contact from './Pages/Contact'
import AllProducts from './Pages/AllProducts'
import ProductDetails from './Pages/ProductDetails'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Cart from './Pages/Cart'
import About from './Pages/About'
import Profile from './Pages/Profile'

const App = () => {
  const location = useLocation()
  const auth = location.pathname.startsWith('/login') || location.pathname.startsWith('/register')
  const profile = location.pathname.startsWith('/profile')
  return (
    <div>
      <NavbarDemo />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/products' element={<AllProducts />} />
        <Route path='/products/:id' element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/features' element={<Features />} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>

      {!auth && !profile && <Footer />}
    </div>
  )
}

export default App
