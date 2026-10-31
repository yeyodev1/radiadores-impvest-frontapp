import { onBeforeUnmount, onMounted, type Ref } from 'vue'

/** Desktop: el carril de destacados avanza horizontal con el scroll vertical. Celular: swipe nativo. */
export function useRailScroll(section: Ref<HTMLElement | null>, track: Ref<HTMLElement | null>, ready: Ref<boolean>) {
  let revert = () => {}
  let killed = false

  const setup = async () => {
    const el = section.value
    const tr = track.value
    if (!el || !tr) return
    const desktop = window.matchMedia('(min-width: 1024px) and (hover: hover)').matches
    if (!desktop || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
    if (killed) return
    gsap.registerPlugin(ScrollTrigger)
    el.classList.add('is-pinned')
    const distance = () => Math.max(tr.scrollWidth - window.innerWidth + 96, 0)
    const setHeight = () => el.style.setProperty('--rail-h', `${distance() + window.innerHeight}px`)
    setHeight()
    const ctx = gsap.context(() => {
      gsap.to(tr, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom bottom', scrub: 0.6, invalidateOnRefresh: true, onRefreshInit: setHeight },
      })
      gsap.utils.toArray<HTMLElement>('.railcard__media img', el).forEach((img, i) => {
        gsap.fromTo(img, { rotate: i % 2 ? -7 : 7 }, { rotate: i % 2 ? 4 : -4, ease: 'none', scrollTrigger: { trigger: el, start: 'top top', end: 'bottom bottom', scrub: true } })
      })
    }, el)
    ScrollTrigger.refresh()
    revert = () => {
      ctx.revert()
      el.classList.remove('is-pinned')
    }
  }

  onMounted(() => {
    if (ready.value) void setup()
    else {
      const stop = setInterval(() => {
        if (killed) return clearInterval(stop)
        if (ready.value) {
          clearInterval(stop)
          requestAnimationFrame(() => void setup())
        }
      }, 120)
    }
  })

  onBeforeUnmount(() => {
    killed = true
    revert()
  })
}
