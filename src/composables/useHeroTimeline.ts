import { onBeforeUnmount, onMounted, type Ref } from 'vue'

/**
 * El scroll desarma el radiador real: tanques afuera con sus tres argumentos de calidad,
 * y se vuelve a armar para dar paso a "Productos". Solo transform y clip-path.
 */
export function useHeroTimeline(root: Ref<HTMLElement | null>) {
  let revert = () => {}
  let killed = false

  onMounted(async () => {
    const el = root.value
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-static')
      return
    }
    const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
    if (killed) return
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(el)
      const mobile = window.matchMedia('(max-width: 767px)').matches
      const hidden = 'inset(0% 0% 100% 0%)'
      const shown = 'inset(0% 0% 0% 0%)'
      const spread = mobile ? 1.55 : 2.6

      gsap.from(q('.hero__rad'), { yPercent: 18, rotateX: 22, duration: 1.4, ease: 'expo.out' })
      gsap.set(q('[data-beat="1"]'), { clipPath: hidden, yPercent: 8 })
      gsap.set(q('.hero__callout'), { clipPath: 'inset(0% 100% 0% 0%)' })

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.7,
          onUpdate: (self) => el.style.setProperty('--hero-p', self.progress.toFixed(4)),
        },
      })

      // 1. Se abre y aparecen los tres argumentos
      tl.to(q('[data-beat="0"]'), { clipPath: hidden, yPercent: -10, duration: 0.5 }, 0.2)
        .to(q('.hero__rad'), { scale: mobile ? 0.8 : 0.86, rotateY: -8, rotateX: 6, duration: 1.2, ease: 'power1.inOut' }, 0.2)
        .to(q('.hero__part--left'), { xPercent: -100 * spread, rotateY: 34, z: 60, duration: 1.2, ease: 'power2.inOut' }, 0.2)
        .to(q('.hero__part--right'), { xPercent: 100 * spread, rotateY: -34, z: 60, duration: 1.2, ease: 'power2.inOut' }, 0.2)
        .to(q('.hero__sweep'), { xPercent: 260, duration: 1.4 }, 0.3)
        .to(q('.hero__callout'), { clipPath: shown, duration: 0.5, stagger: 0.18 }, 0.9)
        .to({}, { duration: 0.8 })
        // 2. Se vuelve a armar y da paso a Productos
        .to(q('.hero__callout'), { clipPath: 'inset(0% 0% 0% 100%)', duration: 0.4, stagger: 0.05 }, 2.5)
        .to(q('.hero__rad'), { scale: mobile ? 0.72 : 0.62, yPercent: mobile ? -22 : -16, xPercent: mobile ? 0 : 34, rotateY: mobile ? 0 : -14, rotateX: 0, duration: 1.2, ease: 'power2.out' }, 2.6)
        .to(q('.hero__part--left, .hero__part--right'), { xPercent: 0, rotateY: 0, z: 0, duration: 1.0, ease: 'power3.out' }, 2.7)
        .to(q('[data-beat="1"]'), { clipPath: shown, yPercent: 0, duration: 0.7 }, 3.1)
        .to({}, { duration: 0.5 })

      ScrollTrigger.refresh()
    }, el)
    revert = () => ctx.revert()
  })

  onBeforeUnmount(() => {
    killed = true
    revert()
  })
}
