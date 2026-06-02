import { CtaSection } from '@/components/cta/cta-section'
import { FooterSection } from '@/components/footer/footer-section'
import { HeroSection } from '@/components/hero/hero-section'
import { SupportedAssetsSection } from '@/components/supported-assets/supported-assets-section'
import { FaqSection } from '@/components/faq/faq-section'
export default function Home() {
  return (
    <main>
      <HeroSection />
      <SupportedAssetsSection />
      <FaqSection />
      <CtaSection />
      <FooterSection />
    </main>
  )
}
