<script setup lang="ts">
import { useRoute } from 'vue-router'
import ImageUploader from '@/components/admin/ImageUploader.vue'
import { CATEGORIES, SEGMENTS } from '@/config/site'
import { useProductForm } from '@/composables/useProductForm'

const route = useRoute()
const id = route.params.id === 'nuevo' ? null : String(route.params.id)
const { form, loading, saving, uploading, upload, save, remove } = useProductForm(id)
</script>

<template>
  <div class="admin__title">
    <h1>{{ id ? 'Editar producto' : 'Nuevo producto' }}</h1>
    <RouterLink to="/admin/productos" class="a-btn a-btn--ghost">Volver</RouterLink>
  </div>
  <p v-if="loading">Cargando…</p>
  <form v-else class="a-form a-card" @submit.prevent="save">
    <div class="a-form__row">
      <div class="a-form__field">
        <label for="pf-code">Código</label>
        <input id="pf-code" v-model="form.code" placeholder="RD-JC-011" required />
      </div>
      <div class="a-form__field">
        <label for="pf-price">Precio (USD)</label>
        <input id="pf-price" v-model="form.price" inputmode="decimal" placeholder="158.70" required />
      </div>
      <div class="a-form__field">
        <label for="pf-compare">Precio anterior (oferta)</label>
        <input id="pf-compare" v-model="form.compareAt" inputmode="decimal" placeholder="Vacío = sin oferta" />
        <small>Si es mayor al precio, el producto sale tachado en "Ofertas por temporada".</small>
      </div>
    </div>
    <div class="a-form__field">
      <label for="pf-name">Nombre</label>
      <input id="pf-name" v-model="form.name" placeholder="Radiador JAC Sunray" required />
      <small>Así aparece en Google: incluye tipo de pieza, marca y modelo.</small>
    </div>
    <div class="a-form__row">
      <div class="a-form__field">
        <label for="pf-brand">Marca del vehículo</label>
        <input id="pf-brand" v-model="form.brand" placeholder="JAC" />
      </div>
      <div class="a-form__field">
        <label for="pf-model">Modelo</label>
        <input id="pf-model" v-model="form.model" placeholder="Sunray" />
      </div>
    </div>
    <div class="a-form__row">
      <div class="a-form__field">
        <label for="pf-seg">Tipo de vehículo</label>
        <select id="pf-seg" v-model="form.segment">
          <option v-for="s in SEGMENTS.slice(1)" :key="s.id" :value="s.id">{{ s.label }}</option>
        </select>
      </div>
      <div class="a-form__field">
        <label for="pf-cat">Categoría</label>
        <select id="pf-cat" v-model="form.category">
          <option v-for="c in CATEGORIES" :key="c.id" :value="c.id">{{ c.label }}</option>
        </select>
      </div>
    </div>
    <div class="a-form__field">
      <label>Fotos (la primera es la principal)</label>
      <ImageUploader :images="form.images" :uploading="uploading" @upload="upload" @remove="(i) => form.images.splice(i, 1)" />
    </div>
    <div class="a-form__field">
      <label for="pf-desc">Descripción</label>
      <textarea id="pf-desc" v-model="form.description" rows="3" />
    </div>
    <div class="a-form__field">
      <label for="pf-comp">Compatibilidad (una por línea)</label>
      <textarea id="pf-comp" v-model="form.compatibility" rows="3" placeholder="JAC Sunray 2.8 diésel 2012-2020" />
    </div>
    <div class="a-form__checks">
      <label><input v-model="form.isActive" type="checkbox" /> En línea</label>
      <label><input v-model="form.featured" type="checkbox" /> Destacado</label>
      <label><input v-model="form.inStock" type="checkbox" /> En stock</label>
    </div>
    <div class="a-form__actions">
      <button v-if="id" type="button" class="a-btn a-btn--danger" @click="remove">Eliminar</button>
      <button type="submit" class="a-btn" :disabled="saving || uploading">{{ saving ? 'Guardando…' : 'Guardar' }}</button>
    </div>
  </form>
</template>
