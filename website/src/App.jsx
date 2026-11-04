
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SEO from './components/SEO'

import Home from './pages/Home'
import Research from './pages/Research'
import Publications from './pages/Publications'
import Projects from './pages/Projects'
import CV from './pages/CV'
import Contact from './pages/Contact'

import './App.css'

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <SEO
                  description="Rahul Kumar Kundu is an Electrical and Computer Engineering graduate from RUET researching Trustworthy AI, AI Security, and Multi-Objective Optimization."
                  path="/"
                />
                <Home />
              </>
            }
          />

          <Route
            path="/research"
            element={
              <>
                <SEO
                  title="Research"
                  description="Explore Rahul Kumar Kundu's research in Trustworthy AI, AI Security, model robustness, generalization, clinical machine learning, fairness, and multimodal intelligence."
                  path="/research"
                />
                <Research />
              </>
            }
          />

          <Route
            path="/publications"
            element={
              <>
                <SEO
                  title="Publications"
                  description="Journal articles and IEEE conference publications by Rahul Kumar Kundu covering medical image segmentation, cybersecurity, and explainable artificial intelligence."
                  path="/publications"
                />
                <Publications />
              </>
            }
          />

          <Route
            path="/projects"
            element={
              <>
                <SEO
                  title="Projects"
                  description="Explore projects by Rahul Kumar Kundu, including the RUET Astronomy and Science Society website and an ESP32-based IoT home automation system."
                  path="/projects"
                />
                <Projects />
              </>
            }
          />

          <Route
            path="/cv"
            element={
              <>
                <SEO
                  title="Curriculum Vitae"
                  description="View and download the academic CV of Rahul Kumar Kundu, including education, research experience, publications, technical skills, awards, and academic service."
                  path="/cv"
                />
                <CV />
              </>
            }
          />

          <Route
            path="/contact"
            element={
              <>
                <SEO
                  title="Contact"
                  description="Contact Rahul Kumar Kundu for research collaboration, academic discussions, and professional opportunities. Find email, Google Scholar, ORCID, GitHub, and LinkedIn."
                  path="/contact"
                />
                <Contact />
              </>
            }
          />
        </Routes>

        <Footer />
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
