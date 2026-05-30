import { HeroIcon } from '@/components/hero/hero-icon'

const WHITE_ICON = 'brightness-0 invert'

function NgnDropdown() {
  return (
    <div className="flex shrink-0 items-center justify-center gap-[5.029px] rounded-[7.875px] bg-[rgba(252,253,237,0.10)] px-[3.772px] py-[2.514px] lg:gap-[7.298px] lg:rounded-[11.427px] lg:px-[5.473px] lg:py-[3.649px]">
      <HeroIcon
        src="/icons/flags/Nigeria.svg"
        width={13}
        height={13}
        className="size-[8.801px] shrink-0 lg:size-[12.771px]"
      />
      <span className="font-[family-name:var(--font-inter)] text-[6.286px] font-medium uppercase leading-[10.058px] text-white [font-feature-settings:'liga'_off,'calt'_off] lg:text-[9.122px] lg:leading-[14.595px]">
        NGN
      </span>
      <HeroIcon
        src="/icons/hero/chevron-down.svg"
        width={12}
        height={12}
        className={`size-[7.875px] shrink-0 lg:size-[11.427px] ${WHITE_ICON}`}
      />
    </div>
  )
}

const CHART_STROKE =
  'M0 27.0301C4.26463 27.0301 8.28407 25.0366 10.8648 21.6414L20.456 9.02334C24.4763 3.73425 30.738 0.628601 37.3816 0.628601C42.5122 0.628601 47.4698 2.48397 51.3397 5.85245L54.5329 8.63181C58.4971 12.0823 63.5754 13.9829 68.8309 13.9829C72.8059 13.9829 76.7051 15.0708 80.1059 17.1287L85.9361 20.6569C89.0532 22.5431 92.627 23.5403 96.2704 23.5403C99.8713 23.5403 103.405 22.5662 106.497 20.7212L109.782 18.7616C115.024 15.6341 121.014 13.9829 127.118 13.9829C129.046 13.9829 131.015 13.9829 132.883 13.9829C139.528 13.9829 145.952 11.6156 151.009 7.30573C156.066 2.99584 162.492 0.628601 169.137 0.628601H169.393C175.301 0.628601 181.065 2.45542 185.894 5.85874L192.079 10.2178C195.555 12.6678 199.704 13.9829 203.957 13.9829C206.768 13.9829 209.549 13.4082 212.129 12.2942L225.68 6.44454C234.568 2.60777 244.147 0.628601 253.827 0.628601'

const CHART_FILL =
  'M6.76873 26.7522H0V27.0301H253.827V0.628601H239.153L208.218 13.8423H197.421L178.472 0.628601H158.843L143.175 13.8423H117.792L101.772 23.2991H90.701L74.9073 13.8423H60.6806L45.3382 0.628601H26.837L6.76873 26.7522Z'

const DESKTOP_CHART_SCALE_X = 368.337 / 253.827
const DESKTOP_CHART_SCALE_Y = 38.312 / 27.0301

function ChartFillGradient({
  id,
  x,
  y1,
  y2,
}: {
  id: string
  x: number
  y1: number
  y2: number
}) {
  return (
    <linearGradient
      id={id}
      x1={x}
      y1={y1}
      x2={x}
      y2={y2}
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0" stopColor="#C8E905" stopOpacity={0.06} />
      <stop offset="1" stopColor="#C8E905" stopOpacity={0} />
    </linearGradient>
  )
}

/** Bounding-box gradient — required when fill lives inside a scaled group. */
function ChartFillGradientBoundingBox({ id }: { id: string }) {
  return (
    <linearGradient
      id={id}
      x1="0"
      y1="0.3777"
      x2="0"
      y2="1"
      gradientUnits="objectBoundingBox"
    >
      <stop offset="0" stopColor="#C8E905" stopOpacity={0.06} />
      <stop offset="1" stopColor="#C8E905" stopOpacity={0} />
    </linearGradient>
  )
}

function PortfolioSparkline() {
  return (
    <>
      {/* Mobile */}
      <svg
        viewBox="0 0 254 28"
        fill="none"
        aria-hidden
        className="h-[26.402px] w-full self-stretch lg:hidden"
      >
        <defs>
          <ChartFillGradient
            id="portfolioChartFillMobile"
            x={126.914}
            y1={10.5994}
            y2={27.0301}
          />
        </defs>
        <path d={CHART_FILL} fill="url(#portfolioChartFillMobile)" />
        <path d={CHART_STROKE} stroke="#C8E905" strokeWidth={1.25721} />
      </svg>

      {/* Desktop — fill + stroke share scale so gradient sits under the line */}
      <svg
        viewBox="0 0 369 39"
        fill="none"
        aria-hidden
        className="hidden h-[38.312px] w-full shrink-0 self-stretch lg:block"
      >
        <defs>
          <ChartFillGradientBoundingBox id="portfolioChartFillDesktop" />
        </defs>
        <g transform={`scale(${DESKTOP_CHART_SCALE_X} ${DESKTOP_CHART_SCALE_Y})`}>
          <path d={CHART_FILL} fill="url(#portfolioChartFillDesktop)" />
          <path
            d={CHART_STROKE}
            fill="none"
            stroke="#C8E905"
            strokeWidth={1.824}
            vectorEffect="non-scaling-stroke"
          />
        </g>
      </svg>
    </>
  )
}

function SuccessChangePill() {
  return (
    <div className="flex shrink-0 items-center justify-center gap-[2.514px] rounded-[15.087px] bg-[rgba(31,193,107,0.10)] px-[2.514px] py-[1.257px] lg:gap-[3.649px] lg:rounded-[21.893px] lg:px-[3.649px] lg:py-[1.824px]">
      <svg
        viewBox="0 0 7 7"
        fill="none"
        className="size-[7.543px] shrink-0 lg:size-[10.946px]"
        aria-hidden
      >
        <path
          d="M0.58925 6.18722L0 5.59805L4.76471 0.833333H2.4373V0H6.1873V3.75001H5.35396V1.42257L0.58925 6.18722Z"
          fill="#1DAF61"
        />
      </svg>
      <span className="font-[family-name:var(--font-inter)] text-[7.543px] font-medium uppercase leading-[10.058px] tracking-[0.302px] text-[#1DAF61] [font-feature-settings:'liga'_off,'calt'_off] lg:text-[10.946px] lg:leading-[14.595px] lg:tracking-[0.438px]">
        +4.2%
      </span>
    </div>
  )
}

function PortfolioFooter() {
  return (
    <div className="flex items-center gap-[6.286px] lg:gap-[9.122px]">
      <SuccessChangePill />
      <div className="flex items-center gap-[2px] lg:gap-[3px]">
        <HeroIcon
          src="/icons/hero/exchange-line.svg"
          width={15}
          height={15}
          className={`size-[10.058px] shrink-0 lg:size-[14.595px] ${WHITE_ICON}`}
        />
        <span className="font-[family-name:var(--font-inter)] text-[7.543px] font-medium uppercase leading-[10.058px] tracking-[0.302px] text-white [font-feature-settings:'liga'_off,'calt'_off] lg:text-[10.946px] lg:leading-[14.595px] lg:tracking-[0.438px]">
          ₦1200 PAST 24HR
        </span>
      </div>
    </div>
  )
}

const CARD_BORDER_GRADIENT =
  'linear-gradient(135deg, #5F6F00 0%, #F9FFC8 33%, #02785C 66%, #00000033 100%)'

export function TotalPortfolioValueCard() {
  return (
    <div
      className="w-[282.223px] rounded-[15.087px] p-[1.257px] lg:w-[409.543px] lg:rounded-[21.893px] lg:p-[1.824px]"
      style={{ background: CARD_BORDER_GRADIENT }}
    >
      <div className="flex flex-col items-stretch justify-center gap-[6.286px] rounded-[13.83px] bg-[#45682F] p-[12.572px] lg:gap-[9.122px] lg:rounded-[20.069px] lg:p-[18.244px]">
      <div className="flex w-full items-center justify-between gap-2">
        <span className="font-[family-name:var(--font-inter)] text-[7.543px] font-medium uppercase leading-[10.058px] tracking-[0.302px] text-white [font-feature-settings:'liga'_off,'calt'_off] lg:text-[10.946px] lg:leading-[14.595px] lg:tracking-[0.438px]">
          TOTAL PORTFOLIO VALUE
        </span>
        <NgnDropdown />
      </div>

      <div className="flex items-center gap-[6.286px] lg:gap-[9.122px]">
        <p className="font-[family-name:var(--font-heuvel)] text-[30.173px] font-medium leading-[35.202px] tracking-[-0.302px] text-white [font-feature-settings:'liga'_off,'calt'_off] lg:text-[43.785px] lg:font-normal lg:leading-[51.083px] lg:tracking-[-0.438px]">
          ₦120,000.00
        </p>
        <HeroIcon
          src="/icons/hero/eye-line.svg"
          width={22}
          height={22}
          className={`size-[7.875px] shrink-0 lg:size-[21.893px] ${WHITE_ICON}`}
        />
      </div>

      <PortfolioSparkline />

      <PortfolioFooter />
      </div>
    </div>
  )
}
