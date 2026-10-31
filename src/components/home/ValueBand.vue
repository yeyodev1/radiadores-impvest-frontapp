<script setup lang="ts">
import { VALUES } from '@/config/site'
</script>

<template>
  <section class="values" aria-label="Por qué Impvest">
    <ul>
      <li v-for="v in VALUES" :key="v.title">
        <span class="values__icon"><i class="fa-solid" :class="v.icon" aria-hidden="true" /></span>
        <strong>{{ v.title }}</strong>
        <span>{{ v.text }}</span>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
.values {
  @include pad-x;
  padding-bottom: 4rem;
  background: $alu;

  ul {
    @include flex-cards(160px, 1px);
    margin: 0;
    padding: 0;
    overflow: hidden;
    border-radius: 1.4rem;
    background: $alu-3;
    list-style: none;
  }

  li {
    @include flex(column, flex-start, flex-start, 0.3rem);
    padding: 1.4rem 1.1rem;
    background: $alu;
  }

  &__icon {
    @include flex(row, center, center);
    width: 3rem;
    height: 3rem;
    margin-bottom: 0.4rem;
    border-radius: 0.8rem;
    background: $night;
    color: $copper;
    font-size: 1.2rem;
  }

  strong {
    font-size: 1.1rem;
    font-weight: 800;
    line-height: 1.1;
  }

  span:not(.values__icon) {
    font-size: 0.9rem;
    color: $ink-2;
  }
}
</style>
