<script setup lang="ts">
import { whatsappUrl } from '@/config/site'

const lines = [
  { n: '01', title: 'Radiadores', text: 'Autos, SUV, vans, buses, camiones y maquinaria pesada.', img: '/products/RD-KW-008-sm.webp', href: '#catalogo', tone: 'rad' },
  { n: '02', title: 'Intercoolers', text: 'Para motores turbo diésel y gasolina. Cotiza por modelo.', img: '/img/scenes/copper.webp', href: whatsappUrl('Hola Impvest, busco un intercooler para mi vehículo.'), tone: 'ic' },
  { n: '03', title: 'Partes de radiador', text: 'Tanques, tapas, núcleos y conexiones. Nuestra especialidad desde 1994.', img: '/img/hero/tank-right.webp', href: whatsappUrl('Hola Impvest, necesito partes de radiador (tanques, tapas, núcleos).'), tone: 'parts' },
]
</script>

<template>
  <section class="lines" aria-labelledby="lines-title">
    <h2 id="lines-title" class="lines__title">Todo lo que enfría<br />tu motor</h2>
    <div class="lines__row">
      <a v-for="l in lines" :key="l.n" :href="l.href" :target="l.href.startsWith('http') ? '_blank' : undefined" rel="noreferrer" class="line" :class="`line--${l.tone}`">
        <span class="line__n mono">{{ l.n }}</span>
        <strong>{{ l.title }}</strong>
        <span class="line__text">{{ l.text }}</span>
        <img :src="l.img" alt="" loading="lazy" />
      </a>
    </div>
  </section>
</template>

<style scoped lang="scss">
.lines {
  @include pad-x;
  padding-top: 5rem;
  padding-bottom: 5rem;
  background: $night;
  color: $alu;

  &__title {
    @include display(clamp(2.2rem, 7vw, 4.6rem));
    margin-bottom: 2.4rem;
  }

  &__row {
    @include flex-cards(260px, 1rem);
  }
}

.line {
  @include flex(column, flex-start, flex-start, 0.4rem);
  @include tab-corners;
  position: relative;
  min-height: 19rem;
  padding: 1.6rem;
  overflow: hidden;
  background: $night-2;
  isolation: isolate;
  transition: transform 0.4s $ease;

  @include from('lg') {
    min-height: 26rem;
  }

  &:hover {
    transform: translateY(-6px);
  }

  &__n {
    color: $copper;
  }

  strong {
    font-size: clamp(1.8rem, 4vw, 2.6rem);
    font-weight: 800;
    font-stretch: 115%;
    line-height: 1;
  }

  &__text {
    max-width: 26ch;
    color: $mist;
  }

  img {
    position: absolute;
    z-index: -1;
    right: -12%;
    bottom: -38%;
    width: 64%;
    opacity: 0.55;
    transition: transform 0.6s $ease;

    @include from('lg') {
      bottom: -14%;
      width: 70%;
      opacity: 1;
    }
  }

  &:hover img {
    transform: translate(-4%, -4%) rotate(-3deg);
  }

  &--rad {
    background: linear-gradient(160deg, $night-3, $night-2);
  }

  &--ic img {
    right: 0;
    bottom: 0;
    width: 100%;
    height: 60%;
    object-fit: cover;
    opacity: 1;
    mask-image: linear-gradient(0deg, #000 40%, transparent);
  }

  &--parts {
    background: $copper;
    color: $night;

    .line__n,
    .line__text {
      color: $night;
    }

    img {
      right: 10%;
      bottom: -30%;
      width: 16%;
      opacity: 1;
      transform: rotate(-12deg);
    }

    &:hover img {
      transform: rotate(-4deg) translateY(-6%);
    }
  }
}
</style>
