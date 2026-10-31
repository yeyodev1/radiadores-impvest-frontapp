<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { errorMessage } from '@/utils/format'

const user = useUserStore()
const router = useRouter()
const route = useRoute()
const email = ref('')
const password = ref('')
const error = ref('')
const sending = ref(false)

async function submit() {
  error.value = ''
  sending.value = true
  try {
    const u = await user.login(email.value, password.value)
    if (u.accountType !== 'admin') {
      user.clear()
      error.value = 'Esta cuenta no tiene acceso al panel'
      return
    }
    router.replace(String(route.query.next || '/admin'))
  } catch (e) {
    error.value = errorMessage(e)
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <main class="login">
    <form class="a-form" @submit.prevent="submit">
      <img src="/img/brand/mark.webp" alt="" />
      <h1>Panel Impvest</h1>
      <div class="a-form__field">
        <label for="lg-email">Correo</label>
        <input id="lg-email" v-model="email" type="email" autocomplete="username" required />
      </div>
      <div class="a-form__field">
        <label for="lg-pass">Contraseña</label>
        <input id="lg-pass" v-model="password" type="password" autocomplete="current-password" required />
      </div>
      <p v-if="error" class="checkout__error" role="alert">{{ error }}</p>
      <button class="a-btn" type="submit" :disabled="sending">{{ sending ? 'Entrando…' : 'Entrar' }}</button>
    </form>
  </main>
</template>
