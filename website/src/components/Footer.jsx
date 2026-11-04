
import { useEffect, useState } from 'react'

function Footer() {
  const [lastUpdated, setLastUpdated] = useState('Unavailable')
  const year = new Date().getFullYear()

  useEffect(() => {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)

    async function getLastUpdated() {
      try {
        const response = await fetch(
          'https://api.github.com/repos/Rahul-Kumar-Kundu/Rahul-Kumar-Kundu/commits?path=website%2F&per_page=1',
          { signal: controller.signal }
        )

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`)
        }

        const commits = await response.json()

        if (commits.length > 0) {
          const date = commits[0].commit.committer.date

          setLastUpdated(
            new Date(date).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              timeZone: 'UTC',
            })
          )
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Footer update error:', error)
        }
        setLastUpdated('Unavailable')
      } finally {
        clearTimeout(timeout)
      }
    }

    getLastUpdated()

    return () => {
      controller.abort()
      clearTimeout(timeout)
    }
  }, [])

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <span>© {year} Rahul Kumar Kundu. All rights reserved.</span>
        <span>Last updated: {lastUpdated}</span>
      </div>
    </footer>
  )
}

export default Footer
