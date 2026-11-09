<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AddToCartButton from '@/components/shop/AddToCartButton.vue'
import { useCatalog } from '@/composables/useCatalog'
import { catalogService } from '@/services/catalog.service'
import type { Product } from '@/types'
import { discount, formatCents } from '@/utils/format'
import { productImage } from '@/utils/media'

const { pickSale } = useCatalog()
const items = ref<Product[]>([])

onMounted(async () => {
  try {
    items.value = (await catalogService.list({ sale: true, limit: 8 })).items
  } catch {
    items.value = []
  }
})
</script>

<template>
  <section v-if="items.length" id="ofertas" class="offers" aria-labelledby="offers-title">
    <header class="offers__head">
      <p class="offers__kicker">Descuentos</p>
      <h2 id="offers-title">Ofertas por temporada</h2>
    </header>
    <ul class="offers__row">
      <li class="offer offer--all">
        <a href="#tienda" @click.prevent="pickSale">
          <strong>Descubre todas nuestras ofertas</strong>
          <span class="offer__go"><i class="fa-solid fa-arrow-right" aria-hidden="true" /></span>
        </a>
      </li>
      <li v-for="p in items" :key="p.id" class="offer">
        <RouterLink :to="`/producto/${p.slug}`" class="offer__link">
          <span class="offer__media">
            <img :src="productImage(p, 600)" :alt="p.name" width="600" height="400" loading="lazy" decoding="async" />
            <b class="offer__tag">-{{ discount(p) }}%</b>
          </span>
          <span class="offer__name">{{ p.name }}</span>
          <span class="offer__price">{{ formatCents(p.priceCents) }} <s>{{ formatCents(p.compareAtCents) }}</s></span>
        </RouterLink>
        <AddToCartButton :product="p" />
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
.offers {
  @include pad-x;
  padding-top: 4rem;
  padding-bottom: 4rem;
  background: $surface;
  scroll-margin-top: calc(#{$header-h} + 1rem);

  &__head {
    margin-bottom: 1.6rem;

    h2 {
      @include display(clamp(1.9rem, 5vw, 3.2rem));
    }
  }

  &__kicker {
    @include eyebrow;
    margin-bottom: 0.5rem;
    color: $copper-deep;
  }

  &__row {
    @include flex(row, stretch, flex-start, 0.9rem);
    margin: 0;
    padding: 0 0 0.6rem;
    overflow-x: auto;
    list-style: none;
    scroll-snap-type: x proximity;
    scrollbar-width: thin;
  }
}

.offer {
  @include flex(column, stretch, flex-start);
  flex: 0 0 min(72vw, 15rem);
  scroll-snap-align: start;
  overflow: hidden;
  border-radius: 1rem;
  background: #fff;
  box-shadow: 0 1px 0 $alu-2;

  &--all a {
    @include flex(column, flex-start, space-between, 1rem);
    height: 100%;
    padding: 1.4rem;
    background: $night;
    color: $alu;

    strong {
      font-size: 1.3rem;
      font-weight: 800;
      font-stretch: 112%;
      line-height: 1.05;
    }
  }

  &__go {
    @include flex(row, center, center);
    width: 2.6rem;
    height: 2.6rem;
    border: 1px solid $alu;
    border-radius: 50%;
    transition: background 0.3s, color 0.3s;

    .offer--all a:hover & {
      background: $copper;
      border-color: $copper;
      color: $night;
    }
  }

  &__link {
    @include flex(column, stretch, flex-start, 0.3rem);
    flex: 1;
    padding-bottom: 0.6rem;
  }

  &__media {
    position: relative;
    display: block;
    aspect-ratio: 4 / 3;
    background: $alu;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__tag {
    position: absolute;
    top: 0.6rem;
    left: 0.6rem;
    padding: 0.25rem 0.55rem;
    border-radius: 0.4rem;
    background: $danger;
    color: #fff;
    font-size: 0.8rem;
    font-weight: 800;
  }

  &__name {
    padding: 0.7rem 0.9rem 0;
    font-weight: 700;
    line-height: 1.15;
  }

  &__price {
    padding: 0 0.9rem;
    @include mono(1rem);
    font-weight: 600;
    color: $danger;

    s {
      margin-left: 0.3rem;
      font-size: 0.8rem;
      color: $ink-2;
    }
  }

  .add-btn {
    margin: 0 0.9rem 0.9rem;
    font-size: 0.9rem;
  }
}
</style>
