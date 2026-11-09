import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { adminService, type ProductInput } from '@/services/admin.service'
import { useToastStore } from '@/stores/toast'
import type { Category, ProductImage, Segment } from '@/types'
import { errorMessage } from '@/utils/format'

export function useProductForm(id: string | null) {
  const router = useRouter()
  const toast = useToastStore()
  const loading = ref(Boolean(id))
  const saving = ref(false)
  const uploading = ref(false)
  const form = reactive({
    code: '',
    name: '',
    brand: '',
    model: '',
    segment: 'autos' as Segment,
    category: 'radiador' as Category,
    price: '',
    compareAt: '',
    description: '',
    compatibility: '',
    images: [] as ProductImage[],
    featured: false,
    inStock: true,
    isActive: true,
  })

  async function load() {
    if (!id) return
    try {
      const p = await adminService.product(id)
      Object.assign(form, {
        ...p,
        price: (p.priceCents / 100).toFixed(2),
        compareAt: p.compareAtCents ? (p.compareAtCents / 100).toFixed(2) : '',
        compatibility: p.compatibility.join('\n'),
      })
    } catch (e) {
      toast.show(errorMessage(e), 'error')
    } finally {
      loading.value = false
    }
  }

  async function upload(files: FileList | null) {
    if (!files?.length) return
    uploading.value = true
    try {
      for (const file of Array.from(files)) form.images.push(await adminService.upload(file))
    } catch (e) {
      toast.show(errorMessage(e, 'No se pudo subir la imagen'), 'error')
    } finally {
      uploading.value = false
    }
  }

  async function save() {
    const price = Number(String(form.price).replace(',', '.'))
    const compareAt = Number(String(form.compareAt || '0').replace(',', '.'))
    if (!form.code.trim() || !form.name.trim() || !Number.isFinite(price) || price <= 0 || !Number.isFinite(compareAt) || compareAt < 0) {
      toast.show('Completa código, nombre y un precio válido', 'error')
      return
    }
    saving.value = true
    const input: ProductInput = {
      code: form.code.trim().toUpperCase(),
      name: form.name.trim(),
      brand: form.brand.trim(),
      model: form.model.trim(),
      segment: form.segment,
      category: form.category,
      priceCents: Math.round(price * 100),
      compareAtCents: Math.round(compareAt * 100),
      description: form.description.trim(),
      compatibility: form.compatibility.split('\n').map((c) => c.trim()).filter(Boolean),
      images: form.images,
      featured: form.featured,
      inStock: form.inStock,
      isActive: form.isActive,
    }
    try {
      if (id) await adminService.updateProduct(id, input)
      else await adminService.createProduct(input)
      toast.show('Producto guardado')
      router.push('/admin/productos')
    } catch (e) {
      toast.show(errorMessage(e), 'error')
    } finally {
      saving.value = false
    }
  }

  async function remove() {
    if (!id || !confirm('¿Eliminar este producto? Se borran también sus fotos.')) return
    try {
      await adminService.removeProduct(id)
      toast.show('Producto eliminado')
      router.push('/admin/productos')
    } catch (e) {
      toast.show(errorMessage(e), 'error')
    }
  }

  load()
  return { form, loading, saving, uploading, upload, save, remove }
}
