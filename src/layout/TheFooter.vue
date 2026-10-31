<script setup lang="ts">
import { BRANCHES, BUSINESS } from '@/config/site'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer__big" aria-hidden="true">IMPVEST</div>
    <div class="footer__cols">
      <div class="footer__lead">
        <img src="/img/brand/logo.webp" alt="Impvest Radiators" width="150" height="154" loading="lazy" />
        <p>{{ BUSINESS.claim }}</p>
      </div>
      <div>
        <h3>Contacto</h3>
        <a :href="`tel:${BUSINESS.phoneIntl}`">{{ BUSINESS.phoneDisplay }}</a>
        <a :href="`tel:${BUSINESS.phoneAltIntl}`">{{ BUSINESS.phoneAlt }}</a>
        <a :href="`mailto:${BUSINESS.email}`">{{ BUSINESS.email }}</a>
      </div>
      <div>
        <h3>Horario</h3>
        <p v-for="h in BUSINESS.hours" :key="h.days">{{ h.days }}: <span class="mono">{{ h.time }}</span></p>
      </div>
      <div>
        <h3>Sucursales</h3>
        <a v-for="b in BRANCHES" :key="b.id" href="/#sucursales">{{ b.name }}</a>
      </div>
      <div>
        <h3>Síguenos</h3>
        <a :href="BUSINESS.instagram" target="_blank" rel="noreferrer">Instagram</a>
        <a :href="BUSINESS.facebook" target="_blank" rel="noreferrer">Facebook</a>
        <a :href="BUSINESS.tiktok" target="_blank" rel="noreferrer">TikTok</a>
      </div>
    </div>
    <p class="footer__legal">
      © {{ year }} Impvest. Importación directa de radiadores desde {{ BUSINESS.since }}. Precios en dólares, sujetos a disponibilidad.
    </p>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  @include pad-x;
  position: relative;
  padding-top: 3rem;
  padding-bottom: calc(6rem + env(safe-area-inset-bottom));
  overflow: hidden;
  background: $night;
  color: $mist;

  &__big {
    margin-bottom: 2.5rem;
    font-size: clamp(4.5rem, 22vw, 20rem);
    font-weight: 800;
    font-stretch: 125%;
    line-height: 0.8;
    letter-spacing: -0.04em;
    color: transparent;
    -webkit-text-stroke: 1px $night-3;
  }

  &__cols {
    @include flex-cards(140px, 2rem 1.5rem);

    h3 {
      margin-bottom: 0.7rem;
      @include eyebrow;
      color: $sand;
    }

    a,
    p {
      display: block;
      padding: 0.2rem 0;
      font-size: 0.92rem;
    }

    a:hover {
      color: $alu;
    }
  }

  &__lead {
    flex-basis: 100% !important;

    img {
      width: 6rem;
      margin-bottom: 1rem;
    }

    p {
      max-width: 26ch;
      color: $alu;
      font-size: 1.2rem !important;
      font-weight: 700;
      line-height: 1.25;
    }

    @include from('lg') {
      flex-basis: 260px !important;
    }
  }

  &__legal {
    margin-top: 3rem;
    padding-top: 1.2rem;
    border-top: 1px solid $night-3;
    font-size: 0.78rem;
  }
}
</style>
