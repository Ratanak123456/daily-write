import './App.css'
import HeroSection from './components/homepage/HeroSection'
import NavbarComponent from './components/Navbar/NavbarComponent'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <main>
      <HeroSection/>
    </main>
  )
}

export default App
