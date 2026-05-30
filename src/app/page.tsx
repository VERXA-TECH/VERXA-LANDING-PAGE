import { HeroSection } from '@/components/hero/hero-section'
import { SupportedAssetsSection } from '@/components/supported-assets/supported-assets-section'
import { FaqSection } from '@/components/faq/faq-section'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <SupportedAssetsSection />
      <FaqSection />
    </main>
  )
}
