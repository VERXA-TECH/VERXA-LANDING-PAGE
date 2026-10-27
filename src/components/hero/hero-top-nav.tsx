import { ASSETS } from '@/lib/assets'
import { PageContainer } from '@/components/layout/page-container'
import { SafeImage } from '@/components/ui/safe-image'
import Link from 'next/link'

function VerxaLogo() {
  return (
    <Link href="/" className="flex h-[38px] w-[77px] shrink-0 items-center gap-[2.974px] lg:h-[69px] lg:w-[125px]">
      <SafeImage
        src={ASSETS.logo}
        alt="Verxa"
        width={125}
        height={69}
        priority
        className="h-[38px] w-[77px] object-contain lg:h-[69px] lg:w-[125px]"
      />
    </Link>
  )
}

export function HeroTopNav() {
  return (
    <header className="relative z-20 w-full py-4 lg:pb-0 lg:pt-[50px]">
      <PageContainer className="flex items-center justify-center">
        <VerxaLogo />
      </PageContainer>
    </header>
  )
}
