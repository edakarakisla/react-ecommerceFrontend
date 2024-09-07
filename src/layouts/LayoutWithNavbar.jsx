import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import Footer from '../components/Footer'

function LayoutWithNavbar() {
  const {isUser} = useSelector(state => state.user)
  const navigate = useNavigate()
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default LayoutWithNavbar