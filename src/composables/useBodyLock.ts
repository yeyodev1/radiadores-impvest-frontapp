import { watch, type Ref } from 'vue'

/** Bloquea el scroll del documento mientras `open` es true (cajón, menú). */
export function useBodyLock(open: Ref<boolean>) {
  watch(open, (value) => document.documentElement.classList.toggle('is-locked', value))
}
