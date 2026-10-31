import { onBeforeUnmount, onMounted } from 'vue'

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
    const lenis = new Lenis({ autoRaf: false, lerp: 0.11, anchors: { offset: -72 } })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    cleanup = () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  })

  onBeforeUnmount(() => {
    cancelled = true
    cleanup()
  })
}
