<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { catalogService } from '@/services/catalog.service'
import type { Banner } from '@/types'
import { imageUrl } from '@/utils/media'

const items = ref<Banner[]>([])
const track = ref<HTMLElement | null>(null)
const current = ref(0)
let timer: ReturnType<typeof setInterval> | undefined

const go = (i: number) => {
  const el = track.value
  if (!el) return
  el.scrollTo({ left: el.clientWidth * i, behavior: 'smooth' })
}
const onScroll = () => {
  const el = track.value
  if (el) current.value = Math.round(el.scrollLeft / el.clientWidth)
}

onMounted(async () => {
  try {
    items.value = await catalogService.banners()
  } catch {
    items.value = []
  }
  if (items.value.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    timer = setInterval(() => go((current.value + 1) % items.value.length), 5000)
  }
})
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <section v-if="items.length" class="banners" aria-label="Promociones y novedades">
    <div ref="track" class="banners__track" @scroll.passive="onScroll">
      <component
        :is="b.href ? 'a' : 'div'"
        v-for="b in items"
        :key="b.id"
        class="banners__slide"
        :href="b.href || undefined"
        :target="b.href?.startsWith('http') ? '_blank' : undefined"
        rel="noreferrer"
      >
        <img :src="imageUrl(b.image.url, 1600)" :alt="b.alt" width="1600" height="700" loading="eager" decoding="async" />
      </component>
    </div>
    <div v-if="items.length > 1" class="banners__dots">
      <button v-for="(b, i) in items" :key="b.id" type="button" :class="{ 'is-active': i === current }" :aria-label="`Ir al banner ${i + 1}`" @click="go(i)" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.banners {
  @include pad-x;
  position: relative;
  padding-top: 0.9rem;
  padding-bottom: 0.9rem;
  background: $night;

  &__track {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    border-radius: 1rem;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__slide {
    flex: 0 0 100%;
    scroll-snap-align: start;

    img {
      width: 100%;
      aspect-ratio: 16 / 9;
      object-fit: cover;

      @include from('md') {
        aspect-ratio: 16 / 7;
      }
    }
  }

  &__dots {
    @include flex(row, center, center, 0.4rem);
    position: absolute;
    right: 0;
    bottom: 1.5rem;
    left: 0;

    button {
      width: 0.55rem;
      height: 0.55rem;
      padding: 0;
      border: 0;
      border-radius: 50%;
      background: rgba($alu, 0.5);
      cursor: pointer;
      transition: transform 0.3s $ease, background 0.3s;

      &.is-active {
        background: $copper;
        transform: scale(1.3);
      }
    }
  }
}
</style>
