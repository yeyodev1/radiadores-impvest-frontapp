<script setup lang="ts">
import { whatsappUrl } from '@/config/site'

const href = whatsappUrl('Hola Impvest, necesito un radiador para mi vehículo.')
</script>

<template>
  <a class="wa" :href="href" target="_blank" rel="noreferrer" aria-label="Escríbenos por WhatsApp">
    <i class="fa-brands fa-whatsapp" aria-hidden="true" />
    <span>¿Qué radiador buscas?</span>
  </a>
</template>

<style scoped lang="scss">
.wa {
  @include flex(row, center, center, 0.6rem);
  position: fixed;
  z-index: 60;
  right: max(1rem, env(safe-area-inset-right));
  bottom: max(1rem, env(safe-area-inset-bottom));
  height: 3.6rem;
  min-width: 3.6rem;
  padding: 0 0.95rem;
  border-radius: 1.8rem;
  background: $whatsapp;
  color: #fff;
  font-weight: 700;
  box-shadow: 0 14px 30px -10px rgba($night, 0.55);
  transition: transform 0.3s $ease;

  i {
    font-size: 1.7rem;
  }

  span {
    display: none;

    @include from('md') {
      display: inline;
    }
  }

  &:hover {
    transform: translateY(-3px);
  }
}
</style>
