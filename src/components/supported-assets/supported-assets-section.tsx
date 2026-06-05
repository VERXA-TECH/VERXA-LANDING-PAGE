import { ASSETS } from "@/lib/assets"
import { SupportedAssetsContent } from "@/components/supported-assets/supported-assets-content"

export function SupportedAssetsSection() {
  return (
    <section
      id="assets"
      className="relative z-10 flex w-full flex-col items-center justify-center self-stretch bg-[#1C2E25] py-16 px-5 lg:px-[116px]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-repeat:repeat] [background-position:center_top] [background-size:667px_471px] lg:[background-size:auto]"
        style={{
          backgroundImage: `url(${ASSETS.supportedAssets.background})`,
        }}
      />

      <div className="relative flex w-full max-w-[1512px] flex-col items-center justify-center gap-8 lg:gap-16">
        <SupportedAssetsContent />
      </div>
    </section>
  )
}
