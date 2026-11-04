
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { SiGooglescholar } from 'react-icons/si'

const socialLinks = [
  
{
    name: 'Email',
    url: 'mailto:rahulkumarkundu.ece@gmail.com',
    icon: FaEnvelope,
  },
  
 {
    name: 'Google Scholar',
    url: 'https://scholar.google.com/citations?user=fmnlb7QAAAAJ&hl=en',
    icon: SiGooglescholar,
  },
  {
    name: 'GitHub',
    url: 'https://github.com/Rahul-Kumar-Kundu',
    icon: FaGithub,
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/rahul-kumar-kundu-52b31429a/',
    icon: FaLinkedin,
  },

]

function SocialLinks() {
  return (
    <div className="social-links">
      {socialLinks.map(({ name, url, icon: Icon }) => (
        <a
          key={name}
          href={url}
          target={name === 'Email' ? undefined : '_blank'}
          rel={name === 'Email' ? undefined : 'noopener noreferrer'}
          aria-label={name}
          title={name}
        >
          <Icon aria-hidden="true" />
            <span className="social-tooltip">{name}</span>
        </a>
      ))}
    </div>
  )
}

export default SocialLinks
