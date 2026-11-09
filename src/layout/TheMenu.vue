<script setup lang="ts">
import { onBeforeUnmount, onMounted, toRef } from 'vue'
import { BRANCHES, BUSINESS, NAV, whatsappUrl } from '@/config/site'
import { useBodyLock } from '@/composables/useBodyLock'

const props = defineProps<{ open: boolean; top: number }>()
const emit = defineEmits<{ close: [] }>()

useBodyLock(toRef(props, 'open'))
const onKey = (e: KeyboardEvent) => e.key === 'Escape' && emit('close')
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <Transition name="menu">
    <div v-if="open" class="menu" :style="{ top: `${top}px` }" role="dialog" aria-modal="true" aria-label="Menú principal">
      <div class="menu__panel">
        <nav class="menu__nav" aria-label="Principal">
          <a v-for="(l, i) in NAV" :key="l.href" :href="l.href" class="menu__link" :style="{ '--i': i }" @click="emit('close')">
            <span class="menu__n mono">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="menu__label">{{ l.label }}</span>
            <i class="fa-solid fa-arrow-right" aria-hidden="true" />
          </a>
        </nav>

        <aside class="menu__aside" :style="{ '--i': NAV.length }">
          <div>
            <p class="menu__eyebrow">Contacto</p>
            <a :href="`tel:${BUSINESS.phoneIntl}`" class="mono">{{ BUSINESS.phoneDisplay }}</a>
            <a :href="`tel:${BUSINESS.phoneAltIntl}`" class="mono">{{ BUSINESS.phoneAlt }}</a>
          </div>
          <div>
            <p class="menu__eyebrow">Horario</p>
            <p v-for="h in BUSINESS.hours.slice(0, 2)" :key="h.days">{{ h.days }} <span class="mono">{{ h.time }}</span></p>
          </div>
          <div>
            <p class="menu__eyebrow">Sucursales</p>
            <p>{{ BRANCHES.map((b) => b.name).join(' · ') }}</p>
          </div>
          <a class="menu__wa" :href="whatsappUrl('Hola Impvest, busco un repuesto para mi vehículo.')" target="_blank" rel="noreferrer" @click="emit('close')">
            <i class="fa-brands fa-whatsapp" aria-hidden="true" /> Escríbenos por WhatsApp
          </a>
        </aside>
      </div>
      <span class="menu__big" aria-hidden="true">IMPVEST</span>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
// Menú de pantalla completa: la cortina baja, los enlaces suben en cascada; al cerrar, todo se va en reversa.
.menu {
  // Vive dentro del header (su contexto z 50): las barras llevan z 1 para quedar encima.
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden auto;
  background: $night;
  color: $alu;
  clip-path: inset(0 0 0 0);

  &__panel {
    @include flex(column, stretch, flex-start, 2rem);
    @include pad-x;
    position: relative;
    z-index: 1;
    min-height: calc(100% - 0.1px);
    padding-top: 1.5rem;
    padding-bottom: calc(2rem + env(safe-area-inset-bottom));

    @include from('md') {
      flex-direction: row;
      align-items: flex-end;
      gap: 4rem;
      padding-top: 3rem;
    }
  }

  &__nav {
    @include flex(column, stretch, flex-start);
    flex: 1 1 auto;
  }

  &__link {
    @include flex(row, baseline, flex-start, 0.9rem);
    position: relative;
    padding: 0.75rem 0;
    border-bottom: 1px solid $night-3;
    overflow: hidden;
    transition: padding-left 0.35s $ease;

    &:hover,
    &:focus-visible {
      padding-left: 0.6rem;

      .menu__label {
        color: $copper;
      }

      i {
        opacity: 1;
        transform: translateX(0);
      }
    }

    i {
      margin-left: auto;
      font-size: 1rem;
      color: $copper;
      opacity: 0;
      transform: translateX(-0.6rem);
      transition:
        opacity 0.3s,
        transform 0.35s $ease;
    }
  }

  &__n {
    font-size: 0.72rem;
    color: $copper;
  }

  &__label {
    @include display(clamp(1.7rem, 7.5vw, 3.4rem));
    letter-spacing: -0.02em;
    transition: color 0.3s;

    @include from('md') {
      font-size: clamp(2rem, 4.2vw, 3.6rem);
    }
  }

  &__aside {
    @include flex(column, flex-start, flex-start, 1.1rem);
    flex: 0 0 auto;
    color: $mist;
    font-size: 0.95rem;

    @include from('md') {
      flex-basis: 18rem;
    }

    > div {
      @include flex(column, flex-start, flex-start, 0.15rem);
    }

    a:not(.menu__wa) {
      color: $alu;
      font-size: 1.05rem;
    }
  }

  &__eyebrow {
    @include eyebrow;
    margin-bottom: 0.3rem;
    font-size: 0.62rem;
    color: $sand;
  }

  &__wa {
    @include flex(row, center, center, 0.6rem);
    margin-top: 0.4rem;
    padding: 0.9rem 1.3rem;
    border-radius: 0.7rem;
    background: $whatsapp;
    color: #fff;
    font-weight: 700;
  }

  &__big {
    position: absolute;
    right: -0.05em;
    bottom: -0.18em;
    font-size: clamp(7rem, 32vw, 24rem);
    font-weight: 800;
    font-stretch: 125%;
    line-height: 0.8;
    letter-spacing: -0.04em;
    color: transparent;
    -webkit-text-stroke: 1px $night-3;
    pointer-events: none;
  }
}

// Entrada: cortina 0.6 s + enlaces escalonados. Salida: 0.4 s, enlaces primero.
.menu-enter-active {
  transition: clip-path 0.6s cubic-bezier(0.7, 0, 0.2, 1);

  .menu__link,
  .menu__aside,
  .menu__big {
    transition:
      transform 0.6s $ease,
      opacity 0.5s;
    transition-delay: calc(0.25s + var(--i, 0) * 0.055s);
  }

  .menu__big {
    transition-delay: 0.3s;
  }
}

.menu-leave-active {
  transition: clip-path 0.45s cubic-bezier(0.7, 0, 0.2, 1) 0.12s;

  .menu__link,
  .menu__aside,
  .menu__big {
    transition:
      transform 0.3s cubic-bezier(0.7, 0, 0.2, 1),
      opacity 0.25s;
    transition-delay: calc(var(--i, 0) * 0.02s);
  }
}

.menu-enter-from,
.menu-leave-to {
  clip-path: inset(0 0 100% 0);

  .menu__link,
  .menu__aside {
    opacity: 0;
    transform: translateY(1.6rem);
  }

  .menu__big {
    opacity: 0;
    transform: translateX(6%);
  }
}

@include reduced-motion {
  .menu-enter-active,
  .menu-leave-active,
  .menu-enter-active *,
  .menu-leave-active * {
    transition-duration: 0.01s !important;
    transition-delay: 0s !important;
  }
}
</style>
