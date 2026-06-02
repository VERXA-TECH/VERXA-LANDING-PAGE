/** Central asset paths — kebab-case filenames under /public */
export const ASSETS = {
  logo: "/images/verxa_logo.png",
  hero: {
    bgDesktop: "/images/hero-bg-desktop.png",
    bgMobile: "/images/hero-bg-mobile.png",
    phoneDesktop: "/images/phone-mockup-desktop.png",
    phoneMobile: "/images/phone-mockup-mobile.png",
    avatars: [
      "/images/hero/avatars/avatar-1.png",
      "/images/hero/avatars/avatar-2.png",
      "/images/hero/avatars/avatar-3.png",
      "/images/hero/avatars/avatar-4.png",
    ] as const,
  },
  supportedAssets: {
    bgDesktop: "/images/supported-assets-bg.png",
    bgMobile: "/images/supported-assets-bg-mobile.png",
  },
  cta: {
    bgMark: "/images/cta-bg-mark.png",
    bgMarkDesktop: "/images/cta-mark-desktop.png",
  },
  footer: {
    x: "/icons/footer/twitter-x-line.svg",
    instagram: "/icons/footer/instagram-fill.svg",
    linkedin: "/icons/footer/linkedin-box-fill.svg",
    telegram: "/icons/footer/telegram-fill.svg",
  },
  icons: {
    flags: {
      nigeria: "/icons/flags/Nigeria.svg",
      uk: "/icons/flags/United Kingdom.svg",
      canada: "/icons/flags/Canada.svg",
      ghana: "/icons/flags/Ghana.svg",
      southAfrica: "/icons/flags/South Africa.svg",
    },
    wallets: {
      bitcoin: "/icons/wallets/Bitcoin (BTC).svg",
      ethereum: "/icons/wallets/Ethereum (ETH).svg",
      usdt: "/icons/wallets/Tether USDT.svg",
      usdc: "/icons/wallets/USD Coin (USDC).svg",
    },
    hero: {
      flashlight: "/icons/hero/flashlight-fill.svg",
      tether: "/icons/hero/Tether USDT.svg",
      chevronDown: "/icons/hero/chevron-down.svg",
      exchange: "/icons/hero/exchange-line.svg",
      eye: "/icons/hero/eye-line.svg",
      arrowDown: "/icons/hero/arrow-down-s-line.svg",
      arrowUpDown: "/icons/hero/arrow-up-down-line.svg",
      information: "/icons/hero/information-fill.svg",
      sendPlane: "/icons/hero/send-plane-fill.svg",
    },
  },
} as const

function collectAssetPaths(value: unknown, paths: string[] = []): string[] {
  if (
    typeof value === "string" &&
    (value.startsWith("/images/") || value.startsWith("/icons/"))
  ) {
    paths.push(value)
    return paths
  }

  if (Array.isArray(value)) {
    value.forEach((item) => collectAssetPaths(item, paths))
    return paths
  }

  if (value && typeof value === "object") {
    Object.values(value).forEach((item) => collectAssetPaths(item, paths))
  }

  return paths
}

export const ASSET_PATHS = [...new Set(collectAssetPaths(ASSETS))]
