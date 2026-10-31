<script setup lang="ts">
import { ref } from 'vue'
import { HERO } from '@/config/site'
import { useHeroTimeline } from '@/composables/useHeroTimeline'

const root = ref<HTMLElement | null>(null)
useHeroTimeline(root)
const rail = ['Armado', 'Abierto', 'Núcleo', 'Catálogo']
</script>

<template>
  <section ref="root" class="hero" aria-label="Radiadores Impvest">
    <div class="hero__stage">
      <div class="hero__glow hero__glow--hot" aria-hidden="true" />
      <div class="hero__glow hero__glow--cold" aria-hidden="true" />
      <div class="hero__grid" aria-hidden="true" />

      <div class="hero__temp" aria-hidden="true">
        <span class="hero__temp-label">Refrigerante</span>
        <span class="hero__temp-value"><span data-temp>98</span><sup>°C</sup></span>
        <span class="hero__temp-bar"><i /></span>
      </div>

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

      <div class="hero__fins" aria-hidden="true">
        <img src="/img/scenes/fins.webp" alt="" width="897" height="536" loading="lazy" />
      </div>

      <div class="hero__copy">
        <div class="hero__beat" data-beat="0">
          <p class="hero__kicker">{{ HERO.kicker }}</p>
          <h1 class="hero__title">
            <span v-for="(line, i) in HERO.title" :key="line" class="hero__mask">
              <span class="hero__split" :class="{ hero__hot: i === 2 }">{{ line }}</span>
            </span>
          </h1>
          <p class="hero__body">{{ HERO.body }}</p>
          <div class="hero__actions">
            <a class="cta-finder" href="#catalogo"><i class="fa-solid fa-magnifying-glass" aria-hidden="true" /><span>Buscar mi radiador</span></a>
            <span class="hero__hint"><span class="hero__hint-line" aria-hidden="true" />Desliza y lo abrimos para ti</span>
          </div>
        </div>

        <div v-for="(b, i) in HERO.beats" :key="b.title" class="hero__beat" :class="{ 'hero__beat--cold': i === 1 }" :data-beat="i + 1">
          <p class="hero__kicker">{{ b.kicker }}</p>
          <h2 class="hero__title hero__title--md">{{ b.title }}</h2>
          <p class="hero__body">{{ b.body }}</p>
        </div>

        <div class="hero__beat" data-beat="3">
          <p class="hero__kicker">{{ HERO.close.kicker }}</p>
          <h2 class="hero__title hero__title--md hero__title--close">{{ HERO.close.title }}</h2>
          <dl class="hero__stats">
            <div v-for="s in HERO.stats" :key="s.label"><dt>{{ s.label }}</dt><dd>{{ s.value }}</dd></div>
          </dl>
          <a class="cta-dive" href="#catalogo">Ver catálogo <i class="fa-solid fa-arrow-right" aria-hidden="true" /></a>
        </div>
      </div>

      <ol class="hero__rail" aria-hidden="true">
        <li v-for="r in rail" :key="r">{{ r }}</li>
      </ol>
    </div>
  </section>
</template>
