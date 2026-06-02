import { ASSETS } from "@/lib/assets"
import { SupportedAssetsContent } from "@/components/supported-assets/supported-assets-content"
import { SectionBackgroundImage } from "@/components/ui/section-background-image"

export function SupportedAssetsSection() {
  return (
    <section
      id="assets"
      className="relative z-10 flex w-full flex-col items-center justify-center self-stretch bg-[#1C2E25] py-16 px-5 lg:px-[116px]"
    >
      <SectionBackgroundImage
        src={ASSETS.supportedAssets.bgMobile}
        className="bg-[#1C2E25] lg:hidden"
        imageClassName="object-cover object-[50%]"
      />
      <SectionBackgroundImage
        src={ASSETS.supportedAssets.bgDesktop}
        className="hidden bg-[#1C2E25] lg:block"
        imageClassName="object-cover object-[50%]"
      />

      <div className="relative flex w-full max-w-[1512px] flex-col items-center justify-center gap-8 lg:gap-16">
        <SupportedAssetsContent />
      </div>
    </section>
  )
}
