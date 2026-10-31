# CLAUDE.md

Frontend de Radiadores Impvest. Vue 3 + Vite + TypeScript, SCSS propio, Pinia, vue-router, GSAP + Lenis.
El backend vive en `../radiadores-impvest-backapp` (Express 5 + Mongoose). Contrato: `../CONTRATO-API.md`.

## Comandos

```sh
pnpm install
pnpm dev        # :5185 (fijo), necesita el back en :8140
pnpm build      # vue-tsc -b && vite build
pnpm lint       # incluye la regla de 300 líneas por .vue
```

Verificación: `pnpm build` + navegador a 390 / 768 / 1440 px.

## Reglas

- Ningún `.vue` pasa de 300 líneas: la lógica va a `src/composables/`.
- Layout con flexbox (`flex`, `flex-cards`). Nada de librerías UI ni Tailwind. Iconos Font Awesome por CDN.
- Copy y datos del negocio en `src/config/site.ts`.
- `index.scss` (inyectado en cada `<style>`) solo variables y mixins. Lo que emite CSS va en `global.scss`;
  las secciones grandes (hero, carril, catálogo, carrito, admin) están en `src/styles/sections/` para respetar las 300 líneas.
- Animación: solo transform/clip-path ligados al scroll; todo con `prefers-reduced-motion`.

## Piezas clave

- Hero "radiador abierto": `components/home/HeroExploded.vue` + `composables/useHeroTimeline.ts`. Usa la foto real
  del JAC Sunray cortada en 3 piezas (`public/img/hero/`). ScrollTrigger con scrub; Lenis enlazado en `useSmoothScroll`.
- Catálogo: `useCatalog` (estado de módulo compartido con la marquesina de marcas) contra `/products`.
- Pedido: cajón `layout/TheCartDrawer.vue` → `POST /orders` (precios los pone el servidor) → abre WhatsApp con el código.
- Imágenes: `utils/media.ts` pide a Cloudinary el ancho justo (`c_limit,w_…,f_auto,q_auto`); sin Cloudinary se sirven
  `public/products/<CODE>.webp` y `-sm.webp`.
- SEO: `useSeo` pone título, canonical, OG y JSON-LD (`AutoPartsStore`, `Product`). Sitemap: el back lo genera y
  `vercel.json` reescribe `/sitemap.xml`. Pendiente para máximo SEO: prerender de `/producto/:slug`.
- Admin en `/admin` (login con la cuenta del `.env` del back): productos con subida a Cloudinary y pedidos.
