import { useEffect, useState } from 'react'
import SocialLinks from '../components/SocialLinks'
import News from '../components/News'

function Home() {
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {showIntro ? (
        <div className="welcome-screen">
          <div className="welcome-content">
            <h1 className="welcome-text">Namaskar 🙏</h1>
            <p className="welcome-subtitle">Welcome to my Website</p>
          </div>
        </div>
      ) : (
        <main className="container home-reveal" id="home">
          <section className="home-hero" aria-label="About me and research interests">
            <div className="home-hero-text">

              <div className="home-intro">
                <p>
                  I am <strong>Rahul Kumar Kundu</strong>, a researcher in machine learning and trustworthy artificial intelligence. I completed my B.Sc. in Electrical and Computer Engineering at <strong>Rajshahi University of Engineering and Technology (RUET)</strong>, Bangladesh, graduating with a CGPA of 3.79/4.00 and ranking 7th among 61 students. I previously collaborate research  (Remote) with <a href="https://scholar.google.com/citations?user=VC8FmyEAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">Dr. Amith Khandakar</a> at <strong>Qatar University</strong> from June to October 2026.
                </p>
                <p>
                  My previous research has focused on medical image analysis, multimodal learning, model generalization, and fairness evaluation. My current research interests are mainly in <strong>Trustworthy AI</strong>, particularly robustness, generalization, and reliability; <strong>AI Security</strong>, including AI-based cybersecurity, foundation model security, and privacy; and <strong>Multi-Objective Optimization</strong>, particularly balancing model performance, fairness, and robustness.
                </p>
                <p>
                  My research work has resulted in a first-authored journal publication in <em>Biomedical Signal Processing and Control</em>, two IEEE conference papers, one manuscript under review at <em>IEEE Open Journal of the Computer Society</em>, and two submitted manuscripts.
                </p>
                <p>
                  Beyond research, I served as <strong>Chair of the IEEE RUET Signal Processing Society (SPS) Student Branch Chapter</strong> from 2024 to 2025, where I led technical events, workshops, and research seminars. I also served as <strong>Vice President (Information) of the Astronomy and Science Society of RUET (ASSR)</strong> from 2024 to 2025, where I led the development of the <a href="https://assr-ruet.vercel.app/" target="_blank" rel="noopener noreferrer">official society website</a>. Previously, I served as <strong>Webmaster of the IEEE RUET Student Branch</strong> and as <strong>Secretary for Website and CMT Management</strong> at IEEE PEEIACON 2024.
                </p>
              </div>


              <div className="home-contact-icons">
                <SocialLinks />
              </div>
            </div>

            <div className="home-hero-profile">
              <img
                src={`${import.meta.env.BASE_URL}images/profile.jpeg`}
                alt="Rahul Kumar Kundu"
                className="home-profile-image"
                width="220"
                height="220"
              />
              <h2>Researcher</h2>
              <span className="home-phd-status">Prospective PhD Student</span>
              <p>B.Sc. in Electrical and Computer Engineering (ECE), <br></br> Rajshahi University of Engineering & Technology (RUET)</p>

            </div>
          </section>

          <News />
        </main>
      )}
    </>
  )
}

export default Home
