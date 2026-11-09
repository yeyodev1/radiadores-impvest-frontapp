import { onBeforeUnmount, onMounted } from 'vue'

/** Instancia viva de Lenis; `useBodyLock` la detiene porque overflow:hidden no frena su scroll por rueda. */
export const smooth: { lenis: { stop(): void; start(): void } | null } = { lenis: null }

/** Lenis enlazado al ticker de GSAP (sin el puente, el scrub de ScrollTrigger tartamudea). */
export function useSmoothScroll() {
  let cleanup = () => {}
  let cancelled = false

  onMounted(async () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
      import('lenis'),
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ])
    if (cancelled) return
    gsap.registerPlugin(ScrollTrigger)
    const lenis = new Lenis({ autoRaf: false, lerp: 0.11, anchors: { offset: -120 } })
    smooth.lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    cleanup = () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      smooth.lenis = null
    }
  })

  onBeforeUnmount(() => {
    cancelled = true
    cleanup()
  })
}
