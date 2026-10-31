<script setup lang="ts">
import { computed } from 'vue'
import { useCatalog } from '@/composables/useCatalog'

const { facets, pickBrand } = useCatalog()
const brands = computed(() => facets.value?.brands.map((b) => b.name) ?? [])
</script>

<template>
  <div v-if="brands.length" class="brands" aria-label="Marcas con radiadores en stock">
    <div class="brands__track brands__track--a">
      <div v-for="copy in 2" :key="copy" :aria-hidden="copy === 2">
        <button v-for="b in brands" :key="b" type="button" class="brands__item" :tabindex="copy === 2 ? -1 : 0" @click="pickBrand(b)">{{ b }}</button>
      </div>
    </div>
    <div class="brands__track brands__track--b" aria-hidden="true">
      <div v-for="copy in 2" :key="copy">
        <span v-for="b in brands" :key="b" class="brands__item">{{ b }}</span>
      </div>
    </div>
  </div>
</template>
