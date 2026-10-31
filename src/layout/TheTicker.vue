<script setup lang="ts">
import { PROMISES } from '@/config/site'
</script>

<template>
  <div class="ticker" role="marquee" aria-label="Beneficios Impvest">
    <div class="ticker__track">
      <div v-for="copy in 2" :key="copy" class="ticker__row" :aria-hidden="copy === 2">
        <span v-for="p in PROMISES" :key="p" class="ticker__item"><i aria-hidden="true" />{{ p }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ticker {
  position: relative;
  z-index: 40;
  overflow: hidden;
  background: $copper;
  color: $night;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;

  &__track {
    display: flex;
    width: max-content;
    animation: marquee 38s linear infinite;
  }

  &__row {
    display: flex;
  }

  &__item {
    @include flex(row, center, flex-start, 0.9rem);
    padding: 0.55rem 1.4rem 0.55rem 0;
    white-space: nowrap;

    i {
      width: 0.55rem;
      height: 0.55rem;
      background: $night;
      transform: rotate(45deg);
    }
  }
}
</style>
