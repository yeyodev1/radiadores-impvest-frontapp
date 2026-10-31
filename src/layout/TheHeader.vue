<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { BUSINESS, NAV } from '@/config/site'
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
const menu = ref(false)
const scrolled = ref(false)
const onScroll = () => (scrolled.value = window.scrollY > 24)

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="header" :class="{ 'is-solid': scrolled || menu, 'is-menu': menu }">
    <RouterLink to="/" class="header__brand" aria-label="Radiadores Impvest, inicio" @click="menu = false">
      <img src="/img/brand/mark.webp" alt="" width="44" height="36" />
      <span>IMPVEST<small>Radiadores</small></span>
    </RouterLink>

    <nav class="header__nav" aria-label="Principal">
      <a v-for="l in NAV" :key="l.href" :href="l.href" @click="menu = false">{{ l.label }}</a>
    </nav>

    <div class="header__tools">
      <a class="header__call" :href="`tel:${BUSINESS.phoneIntl}`"><i aria-hidden="true" />{{ BUSINESS.phoneDisplay }}</a>
      <button type="button" class="header__bag" :class="{ 'is-bump': cart.lastAdded }" :aria-label="`Abrir carrito, ${cart.count} productos`" @click="cart.open = true">
        <i class="fa-solid fa-bag-shopping" aria-hidden="true" />
        <span>{{ cart.count }}</span>
      </button>
      <button type="button" class="header__burger" :aria-expanded="menu" aria-label="Menú" @click="menu = !menu">
        <span /><span />
      </button>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  @include flex(row, center, space-between, 1rem);
  @include pad-x;
  position: sticky;
  top: 0;
  z-index: 50;
  height: $header-h;
  color: $alu;
  transition: background 0.35s $ease;

  &.is-solid {
    background: rgba($night, 0.88);
    backdrop-filter: blur(14px) saturate(1.3);
    box-shadow: 0 1px 0 rgba($alu, 0.1);
  }

  &__brand {
    @include flex(row, center, flex-start, 0.6rem);

    img {
      width: 2.5rem;
    }

    span {
      @include flex(column, flex-start, flex-start);
      font-weight: 800;
      font-stretch: 125%;
      font-size: 1.05rem;
      line-height: 1;
      letter-spacing: 0.04em;
    }

    small {
      margin-top: 0.2rem;
      @include eyebrow;
      font-size: 0.6rem;
      font-stretch: 100%;
      color: $sand;
    }
  }

  &__nav {
    display: none;

    .is-menu & {
      @include flex(column, stretch, flex-start);
      position: fixed;
      top: $header-h;
      right: 0;
      left: 0;
      padding: 1rem 1.2rem 2rem;
      background: $night;
      border-bottom: 3px solid $copper;

      a {
        padding: 0.9rem 0;
        border-bottom: 1px solid $night-3;
        font-size: 1.6rem;
        font-weight: 700;
        font-stretch: 115%;
      }
    }

    @include from('lg') {
      &,
      .is-menu & {
        @include flex(row, center, flex-start, 0.25rem);
        position: static;
        padding: 0;
        background: none;
        border: 0;

        a {
          position: relative;
          padding: 0.5rem 0.9rem;
          border: 0;
          font-size: 0.92rem;
          font-weight: 600;
          font-stretch: 100%;

          &::after {
            position: absolute;
            right: 0.9rem;
            bottom: 0.25rem;
            left: 0.9rem;
            height: 2px;
            content: '';
            background: $copper;
            transform: scaleX(0);
            transform-origin: right;
            transition: transform 0.35s $ease;
          }

          &:hover::after {
            transform: scaleX(1);
            transform-origin: left;
          }
        }
      }
    }
  }

  &__tools {
    @include flex(row, center, flex-end, 0.5rem);
  }

  &__call {
    display: none;

    @include from('lg') {
      @include flex(row, center, flex-start, 0.55rem);
      padding: 0.55rem 0.95rem;
      @include mono(0.85rem);

      i {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background: #3ecf7a;
        animation: ping 2.2s infinite;
      }
    }
  }

  &__bag {
    @include flex(row, center, center);
    position: relative;
    width: 2.75rem;
    height: 2.75rem;
    border: 1px solid rgba($alu, 0.28);
    border-radius: 50%;
    background: transparent;
    color: inherit;
    cursor: pointer;

    &.is-bump {
      animation: bump 0.6s $ease;
    }

    span {
      position: absolute;
      top: -0.2rem;
      right: -0.25rem;
      min-width: 1.25rem;
      height: 1.25rem;
      padding: 0 0.3rem;
      border-radius: 1rem;
      background: $cap;
      color: $ink;
      @include mono(0.7rem);
      font-weight: 600;
      line-height: 1.25rem;
      text-align: center;
    }
  }

  &__burger {
    @include flex(column, center, center, 6px);
    width: 2.75rem;
    height: 2.75rem;
    border: 0;
    background: transparent;
    cursor: pointer;

    span {
      width: 22px;
      height: 2px;
      background: $alu;
      transition: transform 0.3s $ease;
    }

    .is-menu & span:first-child {
      transform: translateY(4px) rotate(45deg);
    }

    .is-menu & span:last-child {
      transform: translateY(-4px) rotate(-45deg);
    }

    @include from('lg') {
      display: none;
    }
  }
}

@keyframes bump {
  30% {
    transform: scale(1.18) rotate(-8deg);
  }
  60% {
    transform: scale(0.94) rotate(4deg);
  }
}

@keyframes ping {
  0% {
    box-shadow: 0 0 0 0 rgba(#3ecf7a, 0.7);
  }
  70% {
    box-shadow: 0 0 0 0.55rem transparent;
  }
}
</style>
