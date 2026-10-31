<script setup lang="ts">
import { useToastStore } from '@/stores/toast'

const toasts = useToastStore()
</script>

<template>
  <div class="toasts" aria-live="polite">
    <p v-for="t in toasts.items" :key="t.id" class="toasts__item" :class="`is-${t.kind}`">{{ t.text }}</p>
  </div>
</template>

<style scoped lang="scss">
.toasts {
  @include flex(column, center, flex-start, 0.5rem);
  position: fixed;
  z-index: 120;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;

  &__item {
    padding: 0.7rem 1.1rem;
    border-radius: 0.7rem;
    background: $night;
    color: $alu;
    font-weight: 600;
    box-shadow: 0 10px 30px -10px rgba($night, 0.6);
    animation: rise 0.4s $ease;

    &.is-error {
      background: $danger;
    }
  }
}
</style>
