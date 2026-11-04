
import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://rahul-kumar-kundu.github.io'

function SEO({
  title,
  description,
  path = '/',
}) {
  const fullTitle = title
    ? `${title} | Rahul Kumar Kundu`
    : 'Rahul Kumar Kundu | AI Researcher'

  const url = `${SITE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>

      <meta
        name="description"
        content={description}
      />

      <link
        rel="canonical"
        href={url}
      />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Rahul Kumar Kundu" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}

export default SEO
