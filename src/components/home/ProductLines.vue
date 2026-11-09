<script setup lang="ts">
import { PRODUCT_LINES } from '@/config/site'
import { useCatalog } from '@/composables/useCatalog'

const { pickCategory } = useCatalog()
</script>

<template>
  <section id="productos" class="lines" aria-labelledby="lines-title">
    <h2 id="lines-title" class="lines__title">Todo lo que enfría tu motor</h2>
    <p class="lines__sub">Elige una línea y te llevamos a la tienda con ese filtro puesto.</p>
    <div class="lines__row">
      <a v-for="(l, i) in PRODUCT_LINES" :key="l.category" href="#tienda" class="line" @click.prevent="pickCategory(l.category)">
        <span class="line__n mono">{{ String(i + 1).padStart(2, '0') }}</span>
        <strong>{{ l.title }}</strong>
        <span class="line__text">{{ l.text }}</span>
        <img :src="l.img" alt="" loading="lazy" />
      </a>
    </div>
  </section>
</template>

<style scoped lang="scss">
.lines {
  @include pad-x;
  padding-top: 4rem;
  padding-bottom: 4rem;
  background: $night;
  color: $alu;
  scroll-margin-top: calc(#{$header-h} + 1rem);

  &__title {
    @include display(clamp(1.8rem, 5vw, 3.2rem));
  }

  &__sub {
    margin: 0.6rem 0 1.8rem;
    color: $mist;
  }

  &__row {
    @include flex-cards(150px, 0.8rem);

    > * {
      max-width: calc(50% - 0.4rem);
    }

    @include from('md') {
      > * {
        flex-basis: 200px;
        max-width: calc(33.333% - 0.54rem);
      }
    }

    @include from('xl') {
      > * {
        max-width: calc(25% - 0.6rem);
      }
    }
  }
}

.line {
  @include flex(column, flex-start, flex-start, 0.3rem);
  @include tab-corners(1.2rem);
  position: relative;
  min-height: 10.5rem;
  padding: 1.1rem;
  overflow: hidden;
  background: linear-gradient(160deg, $night-3, $night-2);
  isolation: isolate;
  transition: transform 0.4s $ease;

  @include from('lg') {
    min-height: 13rem;
    padding: 1.3rem;
  }

  &:hover {
    transform: translateY(-5px);
  }

  &__n {
    font-size: 0.7rem;
    color: $copper;
  }

  strong {
    font-size: clamp(1.1rem, 2.4vw, 1.5rem);
    font-weight: 800;
    font-stretch: 112%;
    line-height: 1.02;
    text-wrap: balance;
  }

  &__text {
    max-width: 24ch;
    font-size: 0.82rem;
    color: $mist;
  }

  img {
    position: absolute;
    z-index: -1;
    right: -14%;
    bottom: -30%;
    width: 60%;
    opacity: 0.38;
    transition: transform 0.6s $ease;
  }

  &:hover img {
    transform: translate(-4%, -4%) rotate(-3deg);
  }

  &:nth-child(3) {
    background: $copper;
    color: $night;

    .line__n,
    .line__text {
      color: $night;
    }

    img {
      right: 6%;
      bottom: -26%;
      width: 14%;
      opacity: 1;
      transform: rotate(-12deg);
    }
  }
}
</style>
