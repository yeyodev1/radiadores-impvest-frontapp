import axios from 'axios'
import type { AxiosResponse, AxiosRequestConfig } from 'axios'
import type { ApiError } from '@/types'

export const TOKEN_KEY = 'iv_access_token'

/** localhost → back local; túnel "-front" → mismo host "-back"; producción → API de Vercel. */
export function resolveApiBaseUrl(): string {
  const host = window.location.hostname
  const isLocal = ['localhost', '127.0.0.1'].includes(host)

  let fallback = 'https://radiadores-impvest-backapp.vercel.app/api'
  if (isLocal) fallback = 'http://localhost:8140/api'
  else if (host.includes('-front')) fallback = `${window.location.protocol}//${host.replace('-front', '-back')}/api`

  const envUrl = (import.meta.env.VITE_API_BASE_URL as string) || ''
  const envIsLocal = envUrl.includes('localhost') || envUrl.includes('127.0.0.1')
  const raw = envUrl && (isLocal || !envIsLocal) ? envUrl : fallback
  const trimmed = raw.replace(/\/+$/, '')
  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`
}

function toApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error) && error.response) {
    return { status: error.response.status, message: error.response.data?.message || error.message, data: error.response.data }
  }
  if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
    return { status: 408, message: 'El servidor tardó demasiado en responder' }
  }
  return { status: 500, message: 'No se pudo conectar con el servidor' }
}

class APIBase {
  private baseUrl = resolveApiBaseUrl()
  private http = axios.create({ timeout: 15000 })

  constructor() {
    this.http.interceptors.response.use(
      (r) => r,
      (error) => {
        if (error.response?.status === 401 && localStorage.getItem(TOKEN_KEY)) {
          window.dispatchEvent(new CustomEvent('auth:token-expired'))
        }
        return Promise.reject(error)
      },
    )
  }

  private url(endpoint: string) {
    return `${this.baseUrl}/${endpoint.replace(/^\/+/, '')}`
  }

  protected headers(): Record<string, string> {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) headers.Authorization = `Bearer ${token}`
    return headers
  }

  protected async request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const headers = { ...this.headers(), ...(config.headers as Record<string, string>) }
    // Con FormData el navegador pone el boundary.
    if (config.data instanceof FormData) delete headers['Content-Type']
    try {
      return await this.http.request<T>({ ...config, url: this.url(config.url || ''), headers })
    } catch (error) {
      throw toApiError(error)
    }
  }

  protected get<T>(url: string, params?: Record<string, unknown>) {
    return this.request<T>({ method: 'GET', url, params })
  }

  protected post<T>(url: string, data?: unknown) {
    return this.request<T>({ method: 'POST', url, data })
  }

  protected put<T>(url: string, data?: unknown) {
    return this.request<T>({ method: 'PUT', url, data })
  }

  protected patch<T>(url: string, data?: unknown) {
    return this.request<T>({ method: 'PATCH', url, data })
  }

  protected del<T>(url: string) {
    return this.request<T>({ method: 'DELETE', url })
  }
}

export default APIBase
