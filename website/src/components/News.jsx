
import { useEffect, useRef, useState } from 'react'

const news = [

  {
    date: 'Sep 01, 2026',
    text: 'ED-Net Published in Biomedical Signal Processing and Control',
    link: 'https://rahul-kumar-kundu.github.io/news/ednet/',
  },

    {
    date: 'Jun 01, 2026',
    text: 'Started as a Research Assistant at Qatar University under Dr. Amith Khandakar, conducting research in machine learning, deep learning, and multimodal learning, with contributions to model development, statistical evaluation, reproducible experimentation, and manuscript preparation.',
  },
  
  {
    date: 'Dec 19, 2025',
    text: 'Phishing Website Detection Paper Published at ICCIT 2025',
    link: 'https://rahul-kumar-kundu.github.io/news/iccit_published/',
  },
  {
    date: 'Dec 11, 2025',
    text: 'Tea Leaf Disease Classification Paper Published in IEEE Xplore',
    link: 'https://rahul-kumar-kundu.github.io/news/tea_leaf/',
  },
]

function News() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    const section = sectionRef.current
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`news-section ${visible ? 'news-visible' : ''}`}
    >
      <h2>News & Updates</h2>

      <div className="news-list">
        {news.map((item, index) => (
          <div
            className="news-item"
            key={item.date}
            style={{ '--news-index': index }}
          >
            <span className="news-date">{item.date}</span>

            <p>
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.text}
                </a>
              ) : (
                item.text
              )}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default News
