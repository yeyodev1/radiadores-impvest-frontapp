<script setup lang="ts">
import { computed, ref } from 'vue'
import { BRANCHES, BUSINESS, mapsUrl } from '@/config/site'

const active = ref(BRANCHES[0].id)
const current = computed(() => BRANCHES.find((b) => b.id === active.value) ?? BRANCHES[0])
</script>

<template>
  <section id="sucursales" class="branches" aria-labelledby="branches-title">
    <header class="branches__head">
      <h2 id="branches-title">5 sucursales. Una está cerca de ti.</h2>
      <p>
        {{ BUSINESS.hours[0].days }} <span class="mono">{{ BUSINESS.hours[0].time }}</span> · {{ BUSINESS.hours[1].days }}
        <span class="mono">{{ BUSINESS.hours[1].time }}</span>
      </p>
    </header>

    <div class="branches__body">
      <ol class="branches__list">
        <li v-for="(b, i) in BRANCHES" :key="b.id">
          <button type="button" class="branch" :class="{ 'is-active': b.id === active }" :aria-pressed="b.id === active" @click="active = b.id">
            <span class="branch__n mono">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="branch__name">{{ b.name }}</span>
            <span class="branch__city mono">{{ b.city }}</span>
          </button>
        </li>
      </ol>

      <article :key="current.id" class="branch-card">
        <i class="fa-solid fa-location-dot branch-card__pin" aria-hidden="true" />
        <h3>{{ current.name }}</h3>
        <p>{{ current.address }}</p>
        <p class="mono branch-card__city">{{ current.city }}, Ecuador</p>
        <div class="branch-card__actions">
          <a class="branch-card__route" :href="mapsUrl(current)" target="_blank" rel="noreferrer">Cómo llegar <i class="fa-solid fa-arrow-right" aria-hidden="true" /></a>
          <a class="branch-card__dial" :href="`tel:${BUSINESS.phoneIntl}`">Llamar</a>
        </div>
      </article>

      <aside class="google" aria-label="Calificación en Google">
        <span class="google__g" aria-hidden="true">G</span>
        <span class="google__stars" aria-hidden="true"><i v-for="s in 5" :key="s" class="fa-solid fa-star" /></span>
        <strong>Nuestros clientes nos califican en Google</strong>
        <p>Lee las reseñas reales de cada sucursal o cuéntanos cómo te fue.</p>
        <a class="google__link" :href="mapsUrl(current)" target="_blank" rel="noreferrer">Ver reseñas de {{ current.name }}</a>
      </aside>
    </div>
  </section>
</template>

<style scoped lang="scss">
.branches {
  @include pad-x;
  padding-top: 5rem;
  padding-bottom: 5rem;
  background: $alu-2;
  scroll-margin-top: 4rem;

  &__head {
    @include flex(column, flex-start, flex-start, 0.8rem);
    margin-bottom: 2rem;

    h2 {
      @include display(clamp(2.1rem, 6vw, 4rem));
      max-width: 16ch;
    }

    p {
      color: $ink-2;
    }

    @include from('lg') {
      flex-direction: row;
      align-items: flex-end;
      justify-content: space-between;
    }
  }

  &__body {
    @include flex-cards(280px, 1.2rem);
  }

  &__list {
    margin: 0;
    padding: 0;
    list-style: none;
    border-top: 1px solid $alu-3;
  }
}

.branch {
  @include flex(row, baseline, flex-start, 1rem);
  width: 100%;
  padding: 1.05rem 0.4rem;
  border: 0;
  border-bottom: 1px solid $alu-3;
  background: none;
  color: $ink;
  text-align: left;
  cursor: pointer;
  transition: padding 0.3s $ease, background 0.3s;

  &:hover,
  &.is-active {
    padding-left: 1rem;
  }

  &.is-active {
    background: $night;
    color: $alu;
  }

  &__n {
    font-size: 0.75rem;
    color: $copper;
  }

  &__name {
    flex: 1;
    font-size: 1.35rem;
    font-weight: 800;
    font-stretch: 108%;
  }

  &__city {
    font-size: 0.75rem;
    color: $mist;
  }
}

.branch-card {
  @include flex(column, flex-start, flex-start, 0.6rem);
  @include tab-corners;
  padding: 1.8rem;
  background: $night;
  color: $alu;
  animation: rise 0.5s $ease;

  &__pin {
    font-size: 1.6rem;
    color: $copper;
  }

  h3 {
    font-size: 2rem;
    font-weight: 800;
    font-stretch: 112%;
    line-height: 1;
  }

  p {
    color: $mist;
  }

  &__city {
    font-size: 0.8rem;
  }

  &__actions {
    @include flex(row, center, flex-start, 0.7rem);
    flex-wrap: wrap;
    margin-top: 1rem;
  }

  // CTA ruta: la flecha avanza.
  &__route {
    @include flex(row, center, flex-start, 0.6rem);
    padding: 0.85rem 1.2rem;
    border-radius: 0.6rem;
    background: $copper;
    color: $night;
    font-weight: 800;

    i {
      transition: transform 0.35s $ease;
    }

    &:hover i {
      transform: translateX(5px);
    }
  }

  // CTA llamar: se rellena desde abajo.
  &__dial {
    padding: 0.85rem 1.2rem;
    border: 1px solid $night-3;
    border-radius: 0.6rem;
    background: linear-gradient($alu, $alu) 0 100% / 100% 0 no-repeat;
    font-weight: 700;
    transition: background-size 0.35s $ease, color 0.35s;

    &:hover {
      background-size: 100% 100%;
      color: $night;
    }
  }
}

.google {
  @include flex(column, flex-start, flex-start, 0.6rem);
  @include tab-corners;
  padding: 1.8rem;
  background: #fff;

  &__g {
    @include flex(row, center, center);
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background: conic-gradient(#ea4335 0 25%, #fbbc05 0 50%, #34a853 0 75%, #4285f4 0);
    color: #fff;
    font-size: 1.4rem;
    font-weight: 800;
  }

  &__stars {
    @include flex(row, center, flex-start, 0.15rem);
    color: #fbbc05;
  }

  strong {
    font-size: 1.3rem;
    line-height: 1.15;
  }

  p {
    color: $ink-2;
  }

  &__link {
    margin-top: 0.4rem;
    padding-bottom: 0.15rem;
    font-weight: 700;
    color: #1a5fd0;
    background: linear-gradient(currentColor, currentColor) 0 100% / 0 2px no-repeat;
    transition: background-size 0.3s $ease;

    &:hover {
      background-size: 100% 2px;
    }
  }
}
</style>
