import { onBeforeUnmount, watchEffect } from 'vue'
import { SITE_URL } from '@/config/site'

interface SeoInput {
  title: string
  description: string
  path: string
  image?: string
  type?: string
  jsonLd?: Record<string, unknown> | null
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

/**
 * Título, descripción, canonical, OG y JSON-LD por página.
 * Google ejecuta JS y lee el JSON-LD inyectado; para prerender ver CLAUDE.md.
 */
export function useSeo(get: () => SeoInput | null) {
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.dataset.seo = 'page'

  watchEffect(() => {
    const seo = get()
    if (!seo) return
    const url = `${SITE_URL}${seo.path}`
    const image = seo.image?.startsWith('http') ? seo.image : `${SITE_URL}${seo.image || '/img/brand/og.jpg'}`
    document.title = seo.title
    setMeta('name', 'description', seo.description)
    setMeta('property', 'og:title', seo.title)
    setMeta('property', 'og:description', seo.description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', image)
    setMeta('property', 'og:type', seo.type || 'website')
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = url
    if (seo.jsonLd) {
      script.textContent = JSON.stringify(seo.jsonLd)
      if (!script.isConnected) document.head.appendChild(script)
    }
  })

  onBeforeUnmount(() => script.remove())
}
