import { ASSETS } from "@/lib/assets"
import { HeroIcon } from "@/components/hero/hero-icon"
import { SECTION_EYEBROW_PILL_SURFACE } from "@/components/ui/section-eyebrow-pill"

type AssetItem = {
  label: string
  iconSrc: string
}

const FIAT_ASSETS: AssetItem[] = [
  { label: "Nigerian Naira - NGN", iconSrc: ASSETS.icons.flags.nigeria },
  { label: "British Pound - GBP", iconSrc: ASSETS.icons.flags.uk },
  { label: "Canadian Dollar - CAD", iconSrc: ASSETS.icons.flags.canada },
  { label: "Ghana Cedi - GHS", iconSrc: ASSETS.icons.flags.ghana },
  {
    label: "South African Rand - ZAR",
    iconSrc: ASSETS.icons.flags.southAfrica,
  },
]

const CRYPTO_ASSETS: AssetItem[] = [
  { label: "Bitcoin - BTC", iconSrc: ASSETS.icons.wallets.bitcoin },
  { label: "Ethereum - ETH", iconSrc: ASSETS.icons.wallets.ethereum },
  { label: "Tether - USDT", iconSrc: ASSETS.icons.wallets.usdt },
  { label: "USD Coin - USDC", iconSrc: ASSETS.icons.wallets.usdc },
]

function SupportedAssetsPill() {
  return (
    <div
      className={`inline-flex h-7 items-center justify-center gap-2 rounded-full ${SECTION_EYEBROW_PILL_SURFACE}`}
    >
      <span className="text-center font-[family-name:var(--font-heuvel)] text-xs font-normal leading-4 text-[var(--color-primary-base)] [font-feature-settings:'liga'_off,'calt'_off]">
        SUPPORTED ASSETS
      </span>
    </div>
  )
}

function AssetPill({ label, iconSrc }: AssetItem) {
  return (
    <div className="inline-flex shrink-0 items-center gap-[8.4px] whitespace-nowrap rounded-[140px] border-[0.7px] border-[#94BC27] bg-[#132722] p-[12.6px] text-center font-[family-name:var(--font-heuvel)] text-[10px] font-bold leading-[14px] tracking-[-0.06px] text-white [font-feature-settings:'liga'_off,'calt'_off] lg:gap-3 lg:rounded-[200px] lg:border lg:p-[18px] lg:text-sm lg:leading-5 lg:tracking-[-0.084px]">
      <HeroIcon
        src={iconSrc}
        width={24}
        height={24}
        className="size-[16.8px] shrink-0 lg:size-6"
      />
      <span>{label}</span>
    </div>
  )
}

function AssetRowStatic({ assets }: { assets: AssetItem[] }) {
  return (
    <div className="hidden w-full flex-nowrap items-center justify-center gap-2 lg:flex xl:gap-3">
      {assets.map((asset) => (
        <AssetPill key={asset.label} {...asset} />
      ))}
    </div>
  )
}

function AssetMarqueeRow({
  assets,
  direction,
}: {
  assets: AssetItem[]
  direction: "left" | "right"
}) {
  const marqueeItems = [...assets, ...assets]

  return (
    <div className="relative -mx-5 w-[calc(100%+2.5rem)] overflow-hidden lg:hidden">
      <div
        className={`flex w-max gap-3 ${
          direction === "left" ? "asset-marquee-left" : "asset-marquee-right"
        }`}
      >
        {marqueeItems.map((asset, index) => (
          <AssetPill key={`${asset.label}-${index}`} {...asset} />
        ))}
      </div>
    </div>
  )
}

export function SupportedAssetsContent() {
  return (
    <div className="mx-auto flex w-full max-w-[736px] flex-col items-center gap-6 self-stretch lg:max-w-full">
      <SupportedAssetsPill />

      <h2 className="w-full self-stretch text-center font-[family-name:var(--font-heuvel)] text-[32px] font-normal leading-10 tracking-[-0.16px] [font-feature-settings:'liga'_off,'calt'_off] lg:text-[48px] lg:leading-[56px] lg:tracking-[-0.48px]">
        <span className="text-[var(--color-primary-base)]">
          Crypto and fiat,
        </span>{" "}
        <span className="text-white">together</span>
      </h2>

      <p className="w-full self-stretch text-center font-[family-name:var(--font-heuvel)] text-base font-medium leading-6 tracking-[-0.176px] text-[var(--color-holly-100)] [font-feature-settings:'liga'_off,'calt'_off] lg:text-lg lg:font-normal lg:leading-6 lg:tracking-[-0.27px]">
        Hold, convert and send across 9 assets - 4 cryptocurrencies and 5 fiat
        currencies
        <br />- from a single wallet dashboard
      </p>

      <div className="flex w-full flex-col items-center gap-4 lg:gap-6">
        <AssetMarqueeRow assets={FIAT_ASSETS} direction="left" />
        <AssetRowStatic assets={FIAT_ASSETS} />
        <AssetMarqueeRow assets={CRYPTO_ASSETS} direction="right" />
        <AssetRowStatic assets={CRYPTO_ASSETS} />
      </div>
    </div>
  )
}
