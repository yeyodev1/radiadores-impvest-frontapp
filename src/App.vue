<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import TheCartDrawer from '@/layout/TheCartDrawer.vue'
import TheFooter from '@/layout/TheFooter.vue'
import TheHeader from '@/layout/TheHeader.vue'
import TheTicker from '@/layout/TheTicker.vue'
import TheToasts from '@/layout/TheToasts.vue'
import TheWhatsApp from '@/layout/TheWhatsApp.vue'
import { useSmoothScroll } from '@/composables/useSmoothScroll'

const route = useRoute()
// El panel admin no lleva el chrome de la tienda.
const bare = computed(() => route.matched.some((r) => r.meta.bare))

useSmoothScroll()
</script>

<template>
  <template v-if="bare">
    <RouterView />
  </template>
  <template v-else>
    <TheTicker />
    <TheHeader />
    <RouterView :key="route.path" />
    <TheFooter />
    <TheCartDrawer />
    <TheWhatsApp />
  </template>
  <TheToasts />
</template>
