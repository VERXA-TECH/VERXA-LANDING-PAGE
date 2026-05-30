import { SupportedAssetsContent } from '@/components/supported-assets/supported-assets-content'

const BG_DESKTOP = '/images/supported-assets-bg.png'
const BG_MOBILE = '/images/supported-assets-bg-mobile.png'

export function SupportedAssetsSection() {
  return (
    <section
      id="assets"
      className="relative z-10 flex w-full flex-col items-center justify-center self-stretch bg-[#1C2E25] py-16 px-5 lg:px-[116px]"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[lightgray] bg-cover bg-[50%] bg-no-repeat lg:hidden"
        style={{ backgroundImage: `url('${BG_MOBILE}')` }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 hidden bg-[lightgray] bg-cover bg-[50%] bg-no-repeat lg:block"
        style={{ backgroundImage: `url('${BG_DESKTOP}')` }}
        aria-hidden
      />

      <div className="relative flex w-full max-w-[1512px] flex-col items-center justify-center gap-8 lg:gap-16">
        <SupportedAssetsContent />
      </div>
    </section>
  )
}
