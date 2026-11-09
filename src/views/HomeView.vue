<script setup lang="ts">
import AboutBlock from '@/components/home/AboutBlock.vue'
import BannerCarousel from '@/components/home/BannerCarousel.vue'
import BranchesBlock from '@/components/home/BranchesBlock.vue'
import BrandMarquee from '@/components/home/BrandMarquee.vue'
import CatalogSection from '@/components/home/CatalogSection.vue'
import HeroExploded from '@/components/home/HeroExploded.vue'
import OffersSection from '@/components/home/OffersSection.vue'
import ProductLines from '@/components/home/ProductLines.vue'
import WhyUsSection from '@/components/home/WhyUsSection.vue'
import { BRANCHES, BUSINESS, SITE_URL } from '@/config/site'
import { useSeo } from '@/composables/useSeo'

useSeo(() => ({
  title: 'Radiadores Impvest | Radiadores e intercoolers en Ecuador',
  description:
    'Más de 1000 radiadores para autos, camiones y maquinaria. Entrega el mismo día o máximo 24 horas, envíos a todo Ecuador y 5 sucursales en Quito, Valle de los Chillos, Ambato y Guayaquil.',
  path: '/',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'AutoPartsStore',
    name: BUSINESS.name,
    url: SITE_URL,
    logo: `${SITE_URL}/img/brand/logo.png`,
    image: `${SITE_URL}/img/brand/og.jpg`,
    foundingDate: String(BUSINESS.since),
    telephone: BUSINESS.phoneIntl,
    email: BUSINESS.email,
    areaServed: 'EC',
    sameAs: [BUSINESS.instagram, BUSINESS.facebook, BUSINESS.tiktok],
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:30', closes: '17:30' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '08:30', closes: '12:30' },
    ],
    department: BRANCHES.map((b) => ({
      '@type': 'AutoPartsStore',
      name: `${BUSINESS.name} ${b.name}`,
      telephone: b.phoneIntl,
      address: { '@type': 'PostalAddress', streetAddress: b.address, addressLocality: b.city, addressCountry: 'EC' },
    })),
  },
}))
</script>

<template>
  <main>
    <BannerCarousel />
    <HeroExploded />
    <ProductLines />
    <BrandMarquee />
    <CatalogSection />
    <OffersSection />
    <WhyUsSection />
    <BranchesBlock />
    <AboutBlock />
  </main>
</template>
