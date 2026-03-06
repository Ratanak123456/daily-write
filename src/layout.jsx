import NavbarComponent from './components/Navbar/NavbarComponent'
import { Outlet } from 'react-router-dom'
import FooterComponents from './components/Footer/FooterComponents'
import ChatBot from './components/Chatbot/ChatBot'

export default function Layout() {
  return (
    <>
      <NavbarComponent/>
      <Outlet/>
      <FooterComponents/>
      <ChatBot/>
    </>
  )
}
