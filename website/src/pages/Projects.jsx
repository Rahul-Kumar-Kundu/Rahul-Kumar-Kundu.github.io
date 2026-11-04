
import { FiExternalLink, FiCheckCircle } from 'react-icons/fi'

const projects = [
  {
    id: 'ruet-assr',
    title: 'RUET-ASSR Official Website',
    category: 'Full-Stack Web Development',
    description:
      'Official website for the Astronomy and Science Society of RUET, built with Next.js, Prisma, and MongoDB.',
    overview:
      'Led a team to design and build the official website for the Astronomy and Science Society of RUET (ASSR), serving as the primary digital platform for the society’s announcements, events, member management, and outreach activities. The project involved full-stack web development from design to deployment, with a focus on performance, scalability, and ease of content management for non-technical society members.',
    features: [
      'Society announcements and news feed',
      'Event listing and management',
      'Member registration and profile management',
      'Admin dashboard for content control',
      'Responsive design for mobile and desktop',
    ],
    tech: [
      'Next.js',
      'Tailwind CSS',
      'Prisma ORM',
      'MongoDB',
      'Vercel',
    ],
    role:
      'Team Lead — architecture design, task delegation, frontend development, and deployment.',
    status: 'Completed and Live',
    live: 'https://assr-ruet.vercel.app/',
  },
  {
    id: 'home-automation',
    title: 'Home Automation System',
    category: 'IoT & Embedded Systems',
    description:
      'IoT-based home automation using ESP32 with remote Wi-Fi control, developed during ECE-3212 at RUET.',
    overview:
      'Designed and implemented an IoT-based home automation system using the ESP32 microcontroller with remote control via Wi-Fi. The system enables users to control home appliances through a wireless interface, demonstrating practical integration of embedded systems, networking, and real-time control. The project was developed during ECE-3212: Peripherals and Interfacing Sessional at RUET.',
    features: [
      'ESP32 microcontroller with built-in Wi-Fi and Bluetooth',
      'Remote appliance control via a web-based dashboard',
      'Relay-based switching for multiple home devices',
      'HTTP-based local network communication',
      'Programming with Arduino IDE and ESP32 board support',
    ],
    tech: [
      'ESP32',
      'Embedded C',
      'Arduino IDE',
      'Wi-Fi',
      'HTTP',
      'Relay Modules',
    ],
    role:
      'System design, embedded programming, hardware interfacing, and implementation.',
    status: 'Completed',
    live: null,
  },
]

function Projects() {
  return (
    <main className="container projects-page">
      <div className="projects-intro">
        <h1>Projects</h1>
        <p>
          A selection of projects involving full-stack web
          development, embedded systems, and IoT applications.
        </p>
      </div>

      <div className="projects-list">
        {projects.map((project, index) => (
          <article className="project-card" key={project.id}>
            <div className="project-header">
              <div className="project-heading">
                <span className="project-number">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div>
                  <span className="project-category">
                    {project.category}
                  </span>
                  <h2>{project.title}</h2>
                </div>
              </div>

              <span className="project-status">
                <FiCheckCircle />
                {project.status}
              </span>
            </div>

            <p className="project-description">
              {project.description}
            </p>

            <p className="project-overview">
              {project.overview}
            </p>

            <div className="project-content">
              <div className="project-features">
                <h3>Key Features</h3>
                <ul>
                  {project.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="project-technologies">
                <h3>Technologies</h3>

                <div className="project-tech-list">
                  {project.tech.map((item) => (
                    <span className="project-tech" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="project-footer">
              <p>
                <strong>Role:</strong> {project.role}
              </p>

              {project.live && (
                <a
                  className="project-live-link"
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiExternalLink />
                  Visit Live Website
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}

export default Projects
