
import { FiDownload, FiExternalLink } from 'react-icons/fi'

function CV() {
  const cvUrl = `${import.meta.env.BASE_URL}pdf/CV_Rahul_Kumar_Kundu.pdf`

  return (
    <main className="container cv-page">
      <div className="cv-header">
        <div>
          <h1>Curriculum Vitae</h1>
          <p>Academic Curriculum Vitae</p>
        </div>

        <div className="cv-actions">
          <a
            href={cvUrl}
            download="CV_Rahul_Kumar_Kundu.pdf"
          >
            <FiDownload />
            Download CV
          </a>

          <a
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiExternalLink />
            Open PDF
          </a>
        </div>
      </div>

      <div className="cv-viewer">
        <iframe
          src={`${cvUrl}#toolbar=1&navpanes=0`}
          title="Rahul Kumar Kundu - Curriculum Vitae"
        />
      </div>
    </main>
  )
}

export default CV
