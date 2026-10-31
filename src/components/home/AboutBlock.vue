<script setup lang="ts">
import { BUSINESS } from '@/config/site'

const years = new Date().getFullYear() - BUSINESS.since
</script>

<template>
  <section id="nosotros" class="about" aria-labelledby="about-title">
    <figure class="about__media">
      <img src="/img/scenes/fins.webp" alt="Detalle de las aletas de aluminio de un radiador" width="897" height="536" loading="lazy" />
      <figcaption class="mono">Núcleo de aluminio, vista macro</figcaption>
    </figure>
    <div class="about__copy">
      <h2 id="about-title">{{ years }} años manteniendo <span>la temperatura del país.</span></h2>
      <p>
        Impvest abrió sus puertas en 1994 con una meta clara: ser los mayores importadores y distribuidores de radiadores y tanques de
        radiador de Quito. Hoy somos especialistas en radiadores, intercoolers, accesorios y repuestos automotrices al por mayor y menor,
        con cinco sucursales en el país.
      </p>
      <blockquote>“{{ BUSINESS.claim }}”</blockquote>
    </div>
  </section>
</template>

<style scoped lang="scss">
.about {
  @include flex(column, stretch, flex-start, 2rem);
  @include pad-x;
  padding-top: 5rem;
  padding-bottom: 5rem;
  background: $alu;
  scroll-margin-top: 4rem;

  @include from('lg') {
    flex-direction: row;
    align-items: center;
    gap: 4rem;

    > * {
      flex: 1 1 0;
    }
  }

  &__media {
    @include tab-corners;
    position: relative;
    margin: 0;
    overflow: hidden;

    img {
      width: 100%;
      aspect-ratio: 5 / 4;
      object-fit: cover;
    }

    figcaption {
      position: absolute;
      bottom: 0.8rem;
      left: 0.8rem;
      padding: 0.3rem 0.6rem;
      border-radius: 0.3rem;
      background: $night;
      color: $alu;
      font-size: 0.72rem;
    }
  }

  &__copy {
    @include flex(column, flex-start, flex-start, 1.2rem);

    h2 {
      @include display(clamp(2.1rem, 6vw, 4rem));

      span {
        color: $copper-deep;
      }
    }

    p {
      max-width: 56ch;
      color: $ink-2;
      font-size: 1.05rem;
    }

    blockquote {
      margin: 0;
      padding-left: 1rem;
      border-left: 3px solid $copper;
      font-size: 1.3rem;
      font-weight: 700;
      line-height: 1.3;
    }
  }
}
</style>
