
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://rahul-kumar-kundu.github.io'
const SITE_NAME = 'Rahul Kumar Kundu'

const DEFAULT_TITLE = 'Rahul Kumar Kundu | AI Researcher'
const DEFAULT_DESCRIPTION =
  'Academic portfolio of Rahul Kumar Kundu, an AI researcher working on trustworthy artificial intelligence, AI security, fairness, and machine learning.'

function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  noindex = false,
  image,
}) {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : DEFAULT_TITLE

  const normalizedPath = path.startsWith('/')
    ? path
    : `/${path}`

  const canonicalUrl = new URL(
    normalizedPath,
    `${SITE_URL}/`
  ).href

  const imageUrl = image
    ? new URL(image, `${SITE_URL}/`).href
    : null

  useEffect(() => {
    const links = [
      ...document.head.querySelectorAll('link[rel="canonical"]'),
    ]

    for (const link of links) {
      if (link.getAttribute('href') !== canonicalUrl) {
        link.remove()
      }
    }

    const matches = [
      ...document.head.querySelectorAll('link[rel="canonical"]'),
    ]

    matches.slice(1).forEach(link => link.remove())
  }, [canonicalUrl])

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{fullTitle}</title>

      <meta
        name="description"
        content={description}
      />

      <meta
        name="robots"
        content={
          noindex
            ? 'noindex, follow'
            : 'index, follow'
        }
      />

      <link
        rel="canonical"
        href={canonicalUrl}
      />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />

      {imageUrl && (
        <meta property="og:image" content={imageUrl} />
      )}

      {/* Twitter / X */}
      <meta
        name="twitter:card"
        content={imageUrl ? 'summary_large_image' : 'summary'}
      />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />

      {imageUrl && (
        <meta name="twitter:image" content={imageUrl} />
      )}
    </Helmet>
  )
}

export default SEO
