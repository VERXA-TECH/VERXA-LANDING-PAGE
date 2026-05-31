import Image from 'next/image'
import Link from 'next/link'
import { PageContainer } from '@/components/layout/page-container'

function VerxaLogo() {
  return (
    <Link href="/" className="flex h-[38px] w-[77px] shrink-0 items-center gap-[2.974px]">
      <Image
        src="/images/verxa_logo.png"
        alt="Verxa"
        width={77}
        height={38}
        priority
        className="h-[38px] w-[77px] object-contain"
      />
    </Link>
  )
}

export function HeroTopNav() {
  return (
    <header className="relative z-20 w-full py-4">
      <PageContainer className="flex items-center justify-center">
        <VerxaLogo />
      </PageContainer>
    </header>
  )
}
