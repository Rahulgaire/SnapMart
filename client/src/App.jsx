import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Authlayout from './components/auth/Authlayout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AdminLayout from './components/admin-view/AdminLayout'
import Dashboard from './pages/admin-view/Dashboard'
import Order from './pages/admin-view/Order'
import Product from './pages/admin-view/Product'
import Features from './pages/admin-view/Features'
import ShoppingLayout from './pages/shopping-view/ShoppingLayout'
import PageNotFound from './components/404page/PageNotFound'
const App = () => {
  const navigate = useNavigate()
  let das
  return (
    <div className='flex flex-col overflow-hidden bg-white'>
 
      <Routes>
        <Route path='/auth' element={<Authlayout />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
        <Route path='/admin' element={<AdminLayout/>}>
          <Route path='dashboard' element={<Dashboard/> } />
          <Route path='order' element={<Order/> } />
          <Route path='products' element={<Product/> } />
          <Route path='features' element={ <Features/>} />
        </Route>
        <Route path='/shop' element={<ShoppingLayout/>}>
        </Route>
        <Route path='*' element={<PageNotFound/>} />    
      </Routes>
    </div>
  )
}

export default App
