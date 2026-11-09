<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { adminService } from '@/services/admin.service'
import { catalogService } from '@/services/catalog.service'
import { useToastStore } from '@/stores/toast'
import type { Banner } from '@/types'
import { errorMessage } from '@/utils/format'
import { imageUrl } from '@/utils/media'

type Draft = Pick<Banner, 'image' | 'href' | 'alt'>

const toast = useToastStore()
const items = ref<Draft[]>([])
const loading = ref(true)
const uploading = ref(false)
const saving = ref(false)

onMounted(async () => {
  try {
    items.value = (await catalogService.banners()).map(({ image, href, alt }) => ({ image, href, alt }))
  } catch (e) {
    toast.show(errorMessage(e), 'error')
  } finally {
    loading.value = false
  }
})

async function upload(files: FileList | null) {
  if (!files?.length) return
  uploading.value = true
  try {
    for (const file of Array.from(files)) items.value.push({ image: await adminService.upload(file), href: '', alt: '' })
  } catch (e) {
    toast.show(errorMessage(e, 'No se pudo subir la imagen'), 'error')
  } finally {
    uploading.value = false
  }
}

function move(i: number, dir: -1 | 1) {
  const j = i + dir
  if (j < 0 || j >= items.value.length) return
  ;[items.value[i], items.value[j]] = [items.value[j], items.value[i]]
}

async function save() {
  saving.value = true
  try {
    await adminService.saveBanners(items.value)
    toast.show('Banners guardados')
  } catch (e) {
    toast.show(errorMessage(e), 'error')
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="admin__title">
    <h1>Banners del inicio</h1>
    <button type="button" class="a-btn" :disabled="saving || uploading || loading" @click="save">{{ saving ? 'Guardando…' : 'Guardar cambios' }}</button>
  </div>
  <p class="a-hint">
    Son las imágenes que pasan arriba del radiador (promos, Halloween, 3x1…). Tamaño recomendado 1600×700 px, máximo 10.
    Los cambios se publican al guardar.
  </p>
  <p v-if="loading">Cargando…</p>
  <ul v-else class="a-list">
    <li v-for="(b, i) in items" :key="b.image.url" class="a-row a-row--banner">
      <img :src="imageUrl(b.image.url, 400)" :alt="b.alt || `Banner ${i + 1}`" />
      <div class="a-row__main a-form">
        <div class="a-form__field">
          <label :for="`bn-alt-${i}`">Texto del banner (para Google y lectores de pantalla)</label>
          <input :id="`bn-alt-${i}`" v-model="b.alt" placeholder="Por Halloween, 3x1 en radiadores" />
        </div>
        <div class="a-form__field">
          <label :for="`bn-href-${i}`">Enlace al tocarlo (opcional)</label>
          <input :id="`bn-href-${i}`" v-model="b.href" placeholder="/#ofertas o https://wa.me/…" />
        </div>
      </div>
      <div class="a-row__actions">
        <button type="button" class="a-btn a-btn--ghost" aria-label="Subir" :disabled="i === 0" @click="move(i, -1)"><i class="fa-solid fa-arrow-up" /></button>
        <button type="button" class="a-btn a-btn--ghost" aria-label="Bajar" :disabled="i === items.length - 1" @click="move(i, 1)"><i class="fa-solid fa-arrow-down" /></button>
        <button type="button" class="a-btn a-btn--danger" @click="items.splice(i, 1)">Quitar</button>
      </div>
    </li>
    <li v-if="!items.length" class="a-card">Todavía no hay banners. Sube el primero.</li>
  </ul>
  <label class="uploader__drop" style="margin-top: 1rem">
    <i class="fa-solid" :class="uploading ? 'fa-spinner fa-spin' : 'fa-cloud-arrow-up'" aria-hidden="true" />
    {{ uploading ? 'Subiendo…' : 'Subir banner' }}
    <input type="file" accept="image/*" multiple :disabled="uploading" @change="upload(($event.target as HTMLInputElement).files)" />
  </label>
</template>
