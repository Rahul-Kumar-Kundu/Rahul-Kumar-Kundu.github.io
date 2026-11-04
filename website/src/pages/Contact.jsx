
import {
  FiMail,
  FiMapPin,
  FiGithub,
  FiLinkedin,
  FiExternalLink,
  FiSend,
} from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { SiGooglescholar, SiOrcid } from 'react-icons/si'

const contacts = [
  {
    name: 'Email',
    detail: 'rahulkumarkundu.ece@gmail.com',
    url: 'mailto:rahulkumarkundu.ece@gmail.com',
    icon: FiMail,
  },
  {
    name: 'WhatsApp',
    detail: '+880 1718-401558',
    url: 'https://wa.me/8801718401558',
    icon: FaWhatsapp,
  },
  {
    name: 'Google Scholar',
    detail: 'Research publications and citations',
    url: 'https://scholar.google.com/citations?user=fmnlb7QAAAAJ&hl=en',
    icon: SiGooglescholar,
  },
  {
    name: 'ORCID',
    detail: '0009-0000-4241-4971',
    url: 'https://orcid.org/0009-0000-4241-4971',
    icon: SiOrcid,
  },
  {
    name: 'GitHub',
    detail: 'Rahul-Kumar-Kundu',
    url: 'https://github.com/Rahul-Kumar-Kundu',
    icon: FiGithub,
  },
  {
    name: 'LinkedIn',
    detail: 'Professional profile',
    url: 'https://www.linkedin.com/in/rahul-kumar-kundu-52b31429a/',
    icon: FiLinkedin,
  },
]

function Contact() {
  return (
    <main className="container contact-page">
      <div className="contact-intro">
        <h1>Contact</h1>
        <p>
          I welcome opportunities for research collaboration,
          academic discussions, and professional connections.
          Feel free to reach out through email or connect with
          me on the platforms below.
        </p>
      </div>

      <div className="contact-grid">
        {contacts.map((contact) => {
          const Icon = contact.icon
          const external = !contact.url.startsWith('mailto:')

          return (
            <a
              className="contact-card"
              href={contact.url}
              key={contact.name}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              aria-label={`Contact via ${contact.name}`}
            >
              <span className="contact-icon">
                <Icon />
              </span>

              <span className="contact-info">
                <strong>{contact.name}</strong>
                <span>{contact.detail}</span>
              </span>

              <FiExternalLink
                className="contact-arrow"
                aria-hidden="true"
              />
            </a>
          )
        })}
      </div>

      <div className="contact-bottom">
        <div className="contact-location">
          <FiMapPin />
          <span>Rajshahi, Bangladesh</span>
        </div>

        <a
          className="contact-email-button"
          href="mailto:rahulkumarkundu.ece@gmail.com"
        >
          <FiSend />
          Send an Email
        </a>
      </div>
    </main>
  )
}

export default Contact
