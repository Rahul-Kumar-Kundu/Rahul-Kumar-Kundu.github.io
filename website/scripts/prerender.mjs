
import { chromium } from 'playwright'
import { spawn } from 'node:child_process'
import { mkdir, writeFile, copyFile } from 'node:fs/promises'
import path from 'node:path'

const routes = {
  '/': 'Rahul Kumar Kundu | AI Researcher',
  '/research': 'Research | Rahul Kumar Kundu',
  '/publications': 'Publications | Rahul Kumar Kundu',
  '/projects': 'Projects | Rahul Kumar Kundu',
  '/cv': 'Curriculum Vitae | Rahul Kumar Kundu',
  '/contact': 'Contact | Rahul Kumar Kundu',
}

const baseUrl = 'http://127.0.0.1:4173'
const siteUrl = 'https://rahul-kumar-kundu.github.io'
const dist = path.resolve('dist')

const server = spawn(
  'npm',
  [
    'run', 'preview', '--',
    '--host', '127.0.0.1',
    '--port', '4173',
    '--strictPort',
  ],
  {
    stdio: 'pipe',
    shell: process.platform === 'win32',
  }
)

let browser

try {
  let ready = false

  for (let i = 0; i < 60; i++) {
    if (server.exitCode !== null) {
      throw new Error('Preview server stopped unexpectedly')
    }

    try {
      const response = await fetch(baseUrl)

      if (response.ok) {
        ready = true
        break
      }
    } catch {}

    await new Promise(resolve => setTimeout(resolve, 500))
  }

  if (!ready) {
    throw new Error('Preview server failed to start')
  }

  browser = await chromium.launch({ headless: true })

  const page = await browser.newPage()

  for (const [route, expectedTitle] of Object.entries(routes)) {
    await page.goto(`${baseUrl}${route}`, {
      waitUntil: 'networkidle',
    })

    if (route === '/') {
      await page.locator('#home').waitFor({
        state: 'visible',
        timeout: 10000,
      })
    }

    const metadata = await page.evaluate(
      ({ canonicalUrl, expectedTitle }) => {
        const head = document.head

        // Remove duplicate metadata by attribute name.
        const selectors = [
          'meta[name="description"]',
          'meta[name="robots"]',
          'meta[property^="og:"]',
          'meta[name^="twitter:"]',
        ]

        for (const selector of selectors) {
          const elements = [
            ...head.querySelectorAll(selector),
          ]

          const groups = new Map()

          for (const element of elements) {
            const key =
              element.getAttribute('name') ||
              element.getAttribute('property')

            if (!groups.has(key)) {
              groups.set(key, [])
            }

            groups.get(key).push(element)
          }

          for (const matches of groups.values()) {
            matches.slice(0, -1).forEach(el => el.remove())
          }
        }

        // Set the correct page title.
        head.querySelectorAll('title').forEach(el => el.remove())

        const titleElement = document.createElement('title')
        titleElement.textContent = expectedTitle
        head.appendChild(titleElement)

        // Set the correct canonical URL.
        head.querySelectorAll('link[rel="canonical"]')
          .forEach(el => el.remove())

        const canonical = document.createElement('link')
        canonical.rel = 'canonical'
        canonical.href = canonicalUrl
        head.appendChild(canonical)

        // Ensure Open Graph title and URL are consistent.
        const setMeta = (attribute, name, content) => {
          const elements = [
            ...head.querySelectorAll(
              `meta[${attribute}="${name}"]`
            ),
          ]

          elements.forEach(el => el.remove())

          const meta = document.createElement('meta')
          meta.setAttribute(attribute, name)
          meta.setAttribute('content', content)
          head.appendChild(meta)
        }

        setMeta('property', 'og:title', expectedTitle)
        setMeta('property', 'og:url', canonicalUrl)
        setMeta('name', 'twitter:title', expectedTitle)

        const description = head.querySelector(
          'meta[name="description"]'
        )?.content

        return {
          title: expectedTitle,
          description,
          canonical: canonicalUrl,
        }
      },
      {
        canonicalUrl: `${siteUrl}${route}`,
        expectedTitle,
      }
    )

    if (!metadata.title || !metadata.description) {
      throw new Error(`Missing SEO metadata: ${route}`)
    }

    const html = await page.content()

    const output = route === '/'
      ? path.join(dist, 'index.html')
      : path.join(dist, route.slice(1), 'index.html')

    await mkdir(path.dirname(output), { recursive: true })
    await writeFile(output, html, 'utf8')

    console.log(
      `Prerendered: ${route} | ${metadata.title}`
    )
  }

  // GitHub Pages SPA fallback.
  await copyFile(
    path.join(dist, 'index.html'),
    path.join(dist, '404.html')
  )

  console.log('All routes prerendered successfully')
} finally {
  if (browser) {
    await browser.close()
  }

  server.kill()
}
