
import { useEffect, useRef, useState } from 'react'
import Cite from 'citation-js'

function Publications() {
  const [publications, setPublications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [expanded, setExpanded] = useState({})
  const [copiedId, setCopiedId] = useState(null)
  const copyTimer = useRef(null)

  useEffect(() => {
    let active = true

    async function loadPublications() {
      try {
        const response = await fetch(
          `${import.meta.env.BASE_URL}data/publications.bib`
        )

        if (!response.ok) {
          throw new Error('Could not load publications.bib')
        }

        const bibtex = await response.text()
        const rawEntries = []
        const entryStart = /@([a-zA-Z]+)\s*\{/g
        let match

        while ((match = entryStart.exec(bibtex)) !== null) {
          const start = match.index
          let depth = 1
          let end = entryStart.lastIndex

          while (end < bibtex.length && depth > 0) {
            if (bibtex[end] === '{') depth++
            if (bibtex[end] === '}') depth--
            end++
          }

          if (depth === 0) {
            const raw = bibtex.slice(start, end)
            const id = raw.match(
              /^@\w+\s*\{\s*([^,\s]+)\s*,/
            )?.[1]

            if (id) rawEntries.push({ id, raw })
          }

          entryStart.lastIndex = end
        }

        const entries = new Cite(bibtex).data

        const formatted = entries.map((entry) => {
          const original = rawEntries.find(
            (item) => item.id === entry.id
          )

          const raw = original?.raw || ''
          const abbr =
            raw.match(/\babbr\s*=\s*\{([^}]*)\}/i)?.[1] ||
            raw.match(/\babbr\s*=\s*"([^"]*)"/i)?.[1] ||
            ''

          const rawType = raw.match(/^@(\w+)/)?.[1]?.toLowerCase()

          const type =
            rawType === 'article'
              ? 'journal'
              : ['inproceedings', 'conference'].includes(rawType)
                ? 'conference'
                : 'other'

          return {
            ...entry,
            rawBibtex: raw,
            abbr,
            authors: entry.author || [],
            year: Number(
              entry.issued?.['date-parts']?.[0]?.[0]
            ) || 0,
            venue:
              entry['container-title'] ||
              entry.publisher ||
              'Publication',
            abstract: entry.abstract || '',
            doi: entry.DOI || '',
            url: entry.URL || '',
            type,
          }
        })

        formatted.sort((a, b) => b.year - a.year)

        if (active) setPublications(formatted)
      } catch (err) {
        if (active) setError(err.message)
      } finally {
        if (active) setLoading(false)
      }
    }

    loadPublications()

    return () => {
      active = false
      clearTimeout(copyTimer.current)
    }
  }, [])

  const formatAuthor = (author) =>
    [author.given, author.family].filter(Boolean).join(' ')

  const isMyName = (author) =>
    formatAuthor(author)
      .toLowerCase()
      .replace(/[.,]/g, '')
      .replace(/\s+/g, ' ')
      .trim() === 'rahul kumar kundu'

  const toggle = (id, field) => {
    const key = `${id}-${field}`

    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const copyBibtex = async (entry) => {
    try {
      await navigator.clipboard.writeText(entry.rawBibtex)

      clearTimeout(copyTimer.current)
      setCopiedId(entry.id)

      copyTimer.current = setTimeout(() => {
        setCopiedId(null)
      }, 1800)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }

  const renderPublication = (entry) => {
    const id = entry.id
    const doiUrl = entry.doi
      ? `https://doi.org/${entry.doi}`
      : ''
    const htmlUrl = entry.url || doiUrl

    return (
      <article className="publication-item" key={id}>
        <div className="publication-badge">
          {entry.abbr ||
            (entry.type === 'journal'
              ? 'Journal'
              : entry.type === 'conference'
                ? 'Conference'
                : 'Publication')}
        </div>

        <div className="publication-details">
          <h3>{entry.title}</h3>

          <p className="publication-authors">
            {entry.authors.map((author, index) => (
              <span key={index}>
                {index > 0 && ', '}
                {isMyName(author) ? (
                  <strong>{formatAuthor(author)}</strong>
                ) : (
                  formatAuthor(author)
                )}
              </span>
            ))}
          </p>

          <p className="publication-venue">
            <em>{entry.venue}</em>
            {entry.volume && `, Vol. ${entry.volume}`}
            {entry.page && `, ${entry.page}`}
            {entry.year > 0 && ` (${entry.year})`}
          </p>

          <div className="publication-actions">
            {entry.abstract && (
              <button
                type="button"
                onClick={() => toggle(id, 'abstract')}
              >
                ABS
              </button>
            )}

            {doiUrl && (
              <a
                href={doiUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                DOI
              </a>
            )}

            <button
              type="button"
              onClick={() => toggle(id, 'bib')}
            >
              BIB
            </button>

            {htmlUrl && (
              <a
                href={htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                HTML
              </a>
            )}
          </div>

          {expanded[`${id}-abstract`] && (
            <div className="publication-expand">
              <strong>Abstract</strong>
              <p>{entry.abstract}</p>
            </div>
          )}

          {expanded[`${id}-bib`] && (
            <div className="publication-expand">
              <div className="publication-bib-header">
                <strong>BibTeX</strong>

                <button
                  type="button"
                  className={`bib-copy-button ${
                    copiedId === id ? 'copied' : ''
                  }`}
                  onClick={() => copyBibtex(entry)}
                >
                  <span key={copiedId === id ? 'copied' : 'copy'}>
                    {copiedId === id ? '✓ Copied!' : 'Copy'}
                  </span>
                </button>
              </div>

              <pre>{entry.rawBibtex}</pre>
            </div>
          )}
        </div>
      </article>
    )
  }

  const renderYearSection = (year, items) => {
    const groups = [
      { title: 'Journal Articles', type: 'journal' },
      { title: 'Conference Proceedings', type: 'conference' },
      { title: 'Other Publications', type: 'other' },
    ]

    return (
      <section className="publication-year-section" key={year}>
        <h2 className="publication-year">{year || 'Undated'}</h2>

        {groups.map((group) => {
          const groupItems = items.filter(
            (entry) => entry.type === group.type
          )

          if (!groupItems.length) return null

          return (
            <div className="publication-section" key={group.type}>
              <h3 className="publication-group-title">
                {group.title}
              </h3>

              {groupItems.map(renderPublication)}
            </div>
          )
        })}
      </section>
    )
  }

  const years = [
    ...new Set(publications.map((entry) => entry.year)),
  ].sort((a, b) => b - a)

  return (
    <main className="container publications-page">
      <h1>Publications</h1>

      {loading && <p>Loading publications...</p>}
      {error && <p>Unable to load publications: {error}</p>}

      {!loading && !error && (
        <>
          {years.map((year) =>
            renderYearSection(
              year,
              publications.filter((entry) => entry.year === year)
            )
          )}

          {publications.length === 0 && (
            <p>No publications found.</p>
          )}
        </>
      )}
    </main>
  )
}

export default Publications
