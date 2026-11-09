<script setup lang="ts">
import { REVIEWS, WHY_US } from '@/config/site'
</script>

<template>
  <section id="por-que-nosotros" class="why" aria-labelledby="why-title">
    <header class="why__head">
      <p class="why__kicker">Clientes satisfechos</p>
      <h2 id="why-title">Por qué trabajar con nosotros</h2>
    </header>

    <div class="why__body">
      <figure v-if="WHY_US.video" class="why__video">
        <video :src="WHY_US.video" :poster="WHY_US.poster" controls playsinline preload="metadata" />
        <figcaption class="mono">Nuestros clientes lo cuentan</figcaption>
      </figure>
      <ul class="why__points">
        <li v-for="p in WHY_US.points" :key="p.text">
          <span class="why__icon"><i class="fa-solid" :class="p.icon" aria-hidden="true" /></span>
          <span>{{ p.text }}</span>
        </li>
      </ul>
    </div>

    <ul v-if="REVIEWS.length" class="reviews" aria-label="Reseñas de Google">
      <li v-for="r in REVIEWS" :key="r.author + r.branch" class="review">
        <span class="review__g" aria-hidden="true">G</span>
        <span class="review__stars" aria-label="`${r.stars} de 5 estrellas`"><i v-for="s in r.stars" :key="s" class="fa-solid fa-star" aria-hidden="true" /></span>
        <p>“{{ r.text }}”</p>
        <strong>{{ r.author }}</strong>
        <small class="mono">{{ r.branch }}</small>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
.why {
  @include pad-x;
  padding-top: 5rem;
  padding-bottom: 5rem;
  background: $night;
  color: $alu;
  scroll-margin-top: calc(#{$header-h} + 1rem);

  &__head {
    margin-bottom: 2rem;

    h2 {
      @include display(clamp(2rem, 6vw, 4rem));
      max-width: 16ch;
    }
  }

  &__kicker {
    @include eyebrow;
    margin-bottom: 0.6rem;
    color: $sand;
  }

  &__body {
    @include flex(column, stretch, flex-start, 2rem);

    @include from('lg') {
      flex-direction: row;
      align-items: center;
      gap: 3rem;

      > * {
        flex: 1 1 0;
      }
    }
  }

  &__video {
    @include tab-corners;
    position: relative;
    margin: 0;
    overflow: hidden;
    background: $night-2;

    video {
      display: block;
      width: 100%;
      aspect-ratio: 16 / 9;
      object-fit: cover;
    }

    figcaption {
      position: absolute;
      top: 0.8rem;
      left: 0.8rem;
      padding: 0.3rem 0.6rem;
      border-radius: 0.3rem;
      background: $copper;
      color: $night;
      font-size: 0.72rem;
    }
  }

  &__points {
    @include flex-cards(240px, 1px);
    margin: 0;
    padding: 0;
    overflow: hidden;
    border-radius: 1.4rem;
    background: $night-3;
    list-style: none;

    li {
      @include flex(column, flex-start, flex-start, 0.7rem);
      padding: 1.5rem 1.3rem;
      background: $night-2;
      font-size: 1.02rem;
      line-height: 1.4;
    }
  }

  &__icon {
    @include flex(row, center, center);
    width: 3rem;
    height: 3rem;
    border-radius: 0.8rem;
    background: $copper;
    color: $night;
    font-size: 1.2rem;
  }
}

.reviews {
  @include flex-cards(240px, 1rem);
  margin: 3rem 0 0;
  padding: 0;
  list-style: none;
}

.review {
  @include flex(column, flex-start, flex-start, 0.5rem);
  @include tab-corners(1.2rem);
  position: relative;
  padding: 1.5rem;
  background: #fff;
  color: $ink;

  &__g {
    @include flex(row, center, center);
    position: absolute;
    top: 1.2rem;
    right: 1.2rem;
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    background: conic-gradient(#ea4335 0 25%, #fbbc05 0 50%, #34a853 0 75%, #4285f4 0);
    color: #fff;
    font-weight: 800;
  }

  &__stars {
    @include flex(row, center, flex-start, 0.15rem);
    color: #fbbc05;
  }

  p {
    flex: 1;
    color: $ink-2;
    line-height: 1.45;
  }

  strong {
    margin-top: 0.4rem;
  }

  small {
    color: $ink-2;
  }
}
</style>
