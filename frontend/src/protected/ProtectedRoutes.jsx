import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({children , role='admin'}) => {
    const {user} = useContext(AuthContext)
    if (!user) {
        return <Navigate to='/login' replace/>
      } 
      
      if(user.role && role !=="admin" && user.isVerified){
        return <Navigate to='/' replace/>
      }
  return children
}

export default ProtectedRoutes
