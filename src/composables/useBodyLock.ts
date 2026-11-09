import { watch, type Ref } from 'vue'
import { smooth } from './useSmoothScroll'

/** Bloquea el scroll del documento mientras `open` es true (cajón, menú). */
export function useBodyLock(open: Ref<boolean>) {
  watch(open, (value) => {
    document.documentElement.classList.toggle('is-locked', value)
    if (value) smooth.lenis?.stop()
    else smooth.lenis?.start()
  })
}
