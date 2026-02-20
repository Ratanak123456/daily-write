import React from 'react'
import NavbarComponent from './components/Navbar/NavbarComponent'
import { Outlet } from 'react-router-dom'
import FooterComponents from './components/Footer/FooterComponents'

export default function Layout() {
  return (
    <>
      <NavbarComponent/>
      <Outlet/>
      <FooterComponents/>
    </>
  )
}
