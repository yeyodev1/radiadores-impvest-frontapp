<script setup lang="ts">
import type { ProductImage } from '@/types'
import { imageUrl } from '@/utils/media'

defineProps<{ images: ProductImage[]; uploading: boolean }>()
const emit = defineEmits<{ upload: [files: FileList | null]; remove: [index: number] }>()
</script>

<template>
  <div class="uploader">
    <div v-for="(img, i) in images" :key="img.url" class="uploader__item">
      <img :src="imageUrl(img.url, 300)" :alt="`Foto ${i + 1}`" />
      <button type="button" :aria-label="`Quitar foto ${i + 1}`" @click="emit('remove', i)"><i class="fa-solid fa-xmark" /></button>
    </div>
    <label class="uploader__drop">
      <i class="fa-solid" :class="uploading ? 'fa-spinner fa-spin' : 'fa-cloud-arrow-up'" aria-hidden="true" />
      {{ uploading ? 'Subiendo…' : 'Subir fotos' }}
      <input type="file" accept="image/*" multiple :disabled="uploading" @change="emit('upload', ($event.target as HTMLInputElement).files)" />
    </label>
  </div>
</template>
