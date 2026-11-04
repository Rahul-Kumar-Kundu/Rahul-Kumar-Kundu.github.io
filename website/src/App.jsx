
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Research from './pages/Research'
import Publications from './pages/Publications'
import Projects from './pages/Projects'
import CV from './pages/CV'
import Contact from './pages/Contact'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/research" element={<Research />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/cv" element={<CV />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>


      <Footer />
    </BrowserRouter>
  )
}

export default App
