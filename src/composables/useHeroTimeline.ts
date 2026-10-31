import { onBeforeUnmount, onMounted, type Ref } from 'vue'

/**
 * El scroll desarma el radiador real: tanques afuera, zoom al núcleo (98 → 31 °C)
 * y se vuelve a armar. Solo transform y clip-path; nada queda en opacity 0 esperando.
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
      const temp = q('[data-temp]')[0] as HTMLElement | undefined
      const reading = { value: 98 }
      const hidden = 'inset(0% 0% 100% 0%)'
      const shown = 'inset(0% 0% 0% 0%)'
      const spread = mobile ? 1.55 : 2.6

      if (!mobile) gsap.set(q('.hero__rad'), { xPercent: 38, scale: 0.8 })
      gsap.from(q('.hero__rad'), { yPercent: 18, rotateX: 22, duration: 1.4, ease: 'expo.out' })
      gsap.from(q('[data-beat="0"] .hero__split'), { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.08, delay: 0.15 })
      gsap.set(q('[data-beat]:not([data-beat="0"])'), { clipPath: hidden, yPercent: 8 })
      gsap.set(q('.hero__callout'), { clipPath: 'inset(0% 100% 0% 0%)' })
      gsap.set(q('.hero__fins'), { clipPath: 'circle(0% at 50% 50%)' })

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

      // 1. Se abre
      tl.to(q('[data-beat="0"]'), { clipPath: hidden, yPercent: -10, duration: 0.6 }, 0.35)
        .to(q('.hero__rad'), { scale: mobile ? 0.8 : 0.86, xPercent: 0, rotateY: -8, rotateX: 6, duration: 1.2, ease: 'power1.inOut' }, 0.2)
        .to(q('.hero__part--left'), { xPercent: -100 * spread, rotateY: 34, z: 60, duration: 1.2, ease: 'power2.inOut' }, 0.2)
        .to(q('.hero__part--right'), { xPercent: 100 * spread, rotateY: -34, z: 60, duration: 1.2, ease: 'power2.inOut' }, 0.2)
        .to(q('[data-beat="1"]'), { clipPath: shown, yPercent: 0, duration: 0.6 }, 0.85)
        .to(q('.hero__callout'), { clipPath: shown, duration: 0.5, stagger: 0.12 }, 1.0)
        .to(q('.hero__sweep'), { xPercent: 260, duration: 1.4 }, 0.3)
        // 2. Entramos al núcleo
        .to(q('.hero__callout'), { clipPath: 'inset(0% 0% 0% 100%)', duration: 0.4, stagger: 0.05 }, 2.0)
        .to(q('[data-beat="1"]'), { clipPath: hidden, yPercent: -8, duration: 0.5 }, 2.0)
        .to(q('.hero__rad'), { scale: mobile ? 3.4 : 3.1, rotateY: 0, rotateX: 0, duration: 1.2, ease: 'power2.in' }, 2.1)
        .to(q('.hero__part--left'), { xPercent: -100 * spread * 2.4, duration: 1.2, ease: 'power2.in' }, 2.1)
        .to(q('.hero__part--right'), { xPercent: 100 * spread * 2.4, duration: 1.2, ease: 'power2.in' }, 2.1)
        .to(q('.hero__fins'), { clipPath: 'circle(75% at 50% 50%)', duration: 0.9, ease: 'power2.out' }, 2.75)
        .fromTo(q('.hero__fins img'), { scale: 1.35 }, { scale: 1, duration: 1.6 }, 2.75)
        .to(q('.hero__glow--hot'), { opacity: 0.12, duration: 1.4 }, 2.4)
        .to(q('.hero__glow--cold'), { opacity: 1, duration: 1.4 }, 2.4)
        .to(reading, { value: 31, duration: 1.6, onUpdate: () => { if (temp) temp.textContent = String(Math.round(reading.value)) } }, 2.3)
        .to(q('[data-beat="2"]'), { clipPath: shown, yPercent: 0, duration: 0.6 }, 3.0)
        // 3. Se vuelve a armar
        .to(q('[data-beat="2"]'), { clipPath: hidden, yPercent: -8, duration: 0.5 }, 4.0)
        .to(q('.hero__fins'), { clipPath: 'circle(0% at 50% 50%)', duration: 0.8, ease: 'power2.in' }, 4.0)
        .to(q('.hero__rad'), { scale: mobile ? 0.72 : 0.62, yPercent: mobile ? -22 : -16, xPercent: mobile ? 0 : 34, rotateY: mobile ? 0 : -14, duration: 1.2, ease: 'power2.out' }, 4.5)
        .to(q('.hero__part--left, .hero__part--right'), { xPercent: 0, rotateY: 0, z: 0, duration: 1.0, ease: 'power3.out' }, 4.6)
        .to(q('.hero__glow--hot'), { opacity: 0.85, duration: 1 }, 4.6)
        .to(q('[data-beat="3"]'), { clipPath: shown, yPercent: 0, duration: 0.7 }, 5.0)
        .to({}, { duration: 0.6 })

      ScrollTrigger.refresh()
    }, el)
    revert = () => ctx.revert()
  })

  onBeforeUnmount(() => {
    killed = true
    revert()
  })
}
