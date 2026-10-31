import { computed, reactive, ref } from 'vue'
import { BRANCHES } from '@/config/site'
import { orderService } from '@/services/order.service'
import { useCartStore } from '@/stores/cart'
import type { Order } from '@/types'
import { errorMessage } from '@/utils/format'

const PHONE = /^(\+?593|0)?\s?\d{2}[\s-]?\d{3}[\s-]?\d{3,4}$/

export function useCheckout() {
  const cart = useCartStore()
  const step = ref<'cart' | 'form' | 'done'>('cart')
  const sending = ref(false)
  const error = ref('')
  const result = ref<{ order: Order; whatsappUrl: string } | null>(null)
  const form = reactive({
    name: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    idNumber: '',
    delivery: 'envio' as 'envio' | 'retiro',
    branch: BRANCHES[0].id,
    notes: '',
  })

  const problem = computed(() => {
    if (form.name.trim().length < 3) return 'Escribe tu nombre completo'
    if (!PHONE.test(form.phone.trim())) return 'Escribe un celular válido, por ejemplo 0991234567'
    if (form.delivery === 'envio' && form.city.trim().length < 3) return 'Escribe la ciudad de entrega'
    return ''
  })

  async function submit() {
    error.value = problem.value
    if (error.value || !cart.lines.length) return
    sending.value = true
    try {
      result.value = await orderService.create({
        items: cart.lines.map((l) => ({ code: l.code, qty: l.qty })),
        customer: {
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          city: form.city.trim(),
          address: form.address.trim(),
          idNumber: form.idNumber.trim(),
        },
        delivery: form.delivery,
        branch: form.delivery === 'retiro' ? form.branch : undefined,
        notes: form.notes.trim() || undefined,
      })
      cart.clear()
      step.value = 'done'
      window.open(result.value.whatsappUrl, '_blank', 'noopener')
    } catch (e) {
      error.value = errorMessage(e, 'No pudimos registrar tu pedido. Intenta de nuevo.')
    } finally {
      sending.value = false
    }
  }

  const restart = () => {
    step.value = 'cart'
    result.value = null
    error.value = ''
  }

  return { step, form, sending, error, result, submit, restart }
}
