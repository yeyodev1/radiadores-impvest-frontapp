<script setup lang="ts">
import { BUSINESS } from '@/config/site'

const years = new Date().getFullYear() - BUSINESS.since
</script>

<template>
  <section id="nosotros" class="about" aria-labelledby="about-title">
    <div class="about__top">
      <figure class="about__media">
        <img src="/img/scenes/sucursales.webp" alt="Fachadas de las sucursales de Radiadores Impvest" width="1200" height="1500" loading="lazy" />
        <figcaption class="mono">Nuestras sucursales</figcaption>
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
    </div>

    <div class="about__mv">
      <article class="mv">
        <h3>Nuestra misión</h3>
        <p>{{ BUSINESS.mission }}</p>
      </article>
      <article class="mv mv--vision">
        <h3>Nuestra visión</h3>
        <p>{{ BUSINESS.vision }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped lang="scss">
.about {
  @include flex(column, stretch, flex-start, 2.5rem);
  @include pad-x;
  padding-top: 5rem;
  padding-bottom: 5rem;
  background: $alu;
  scroll-margin-top: calc(#{$header-h} + 1rem);

  &__top {
    @include flex(column, stretch, flex-start, 2rem);

    @include from('lg') {
      flex-direction: row;
      align-items: center;
      gap: 4rem;

      > * {
        flex: 1 1 0;
      }
    }
  }

  &__media {
    @include tab-corners;
    position: relative;
    margin: 0;
    overflow: hidden;

    img {
      width: 100%;
      aspect-ratio: 4 / 5;
      object-fit: cover;

      @include from('lg') {
        aspect-ratio: 4 / 4.4;
      }
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

  &__mv {
    @include flex-cards(280px, 1rem);
  }
}

// Misión y visión como los carteles de la tienda: bloque oscuro, título en cobre.
.mv {
  @include flex(column, flex-start, flex-start, 0.8rem);
  @include tab-corners(1.4rem);
  padding: 2rem;
  background: $night;
  color: $alu;

  h3 {
    @include eyebrow;
    font-size: 0.8rem;
    color: $copper;
  }

  p {
    font-size: clamp(1.15rem, 2.2vw, 1.6rem);
    font-weight: 800;
    font-stretch: 110%;
    line-height: 1.2;
    text-wrap: balance;
  }

  &--vision {
    background: $copper;
    color: $night;

    h3 {
      color: $night;
    }
  }
}
</style>
