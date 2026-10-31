<script setup lang="ts">
import { whatsappUrl } from '@/config/site'
</script>

<template>
  <main class="pdp" style="min-height: 90dvh; color: #e7ecee">
    <p class="mono" style="color: #d27a2c">404</p>
    <h1 style="font-size: clamp(2.4rem, 8vw, 5rem); font-weight: 800; line-height: 0.95">Esta página se recalentó.</h1>
    <p style="margin: 1rem 0 1.5rem">No la encontramos, pero tu radiador seguro sí.</p>
    <div class="pdp__buy">
      <RouterLink to="/" class="cta-finder"><span>Volver al inicio</span></RouterLink>
      <a class="ask-btn" :href="whatsappUrl('Hola Impvest, necesito un radiador.')" target="_blank" rel="noreferrer">WhatsApp</a>
    </div>
  </main>
</template>
