<script setup lang="ts">
import { ref } from 'vue'
import { HERO } from '@/config/site'
import { useHeroTimeline } from '@/composables/useHeroTimeline'

const root = ref<HTMLElement | null>(null)
useHeroTimeline(root)
const rail = ['Armado', 'Abierto', 'Productos']
</script>

<template>
  <section ref="root" class="hero" aria-label="Radiadores Impvest">
    <div class="hero__stage">
      <div class="hero__glow hero__glow--hot" aria-hidden="true" />
      <div class="hero__grid" aria-hidden="true" />

      <div class="hero__rig" aria-hidden="true">
        <div class="hero__rad">
          <img class="hero__part hero__part--left" src="/img/hero/tank-left.webp" alt="" width="124" height="971" fetchpriority="high" />
          <div class="hero__part hero__part--core">
            <img src="/img/hero/core.webp" alt="" width="1288" height="971" fetchpriority="high" />
            <span class="hero__sweep" />
          </div>
          <img class="hero__part hero__part--right" src="/img/hero/tank-right.webp" alt="" width="164" height="971" fetchpriority="high" />
          <span v-for="(c, i) in HERO.callouts" :key="c" class="hero__callout" :class="`hero__callout--${'abc'[i]}`">
            <b>0{{ i + 1 }}</b> {{ c }}
          </span>
        </div>
      </div>

      <div class="hero__copy">
        <div class="hero__beat" data-beat="0">
          <p class="hero__kicker">{{ HERO.kicker }}</p>
          <h1 class="sr-only">Radiadores Impvest: radiadores, intercoolers y repuestos automotrices en Ecuador</h1>
          <span class="hero__hint"><span class="hero__hint-line" aria-hidden="true" />{{ HERO.hint }}</span>
        </div>

        <div class="hero__beat" data-beat="1">
          <p class="hero__kicker">{{ HERO.close.kicker }}</p>
          <h2 class="hero__title hero__title--close">{{ HERO.close.title }}</h2>
          <dl class="hero__stats">
            <div v-for="s in HERO.stats" :key="s.label"><dt>{{ s.label }}</dt><dd>{{ s.value }}</dd></div>
          </dl>
          <a class="cta-dive" href="#productos">Ver productos <i class="fa-solid fa-arrow-right" aria-hidden="true" /></a>
        </div>
      </div>

      <ol class="hero__rail" aria-hidden="true">
        <li v-for="r in rail" :key="r">{{ r }}</li>
      </ol>
    </div>
  </section>
</template>
