import type { ReactNode } from 'react'

type PageContainerProps = {
  children: ReactNode
  className?: string
}

/** Horizontally padded content aligned to the 1512px design grid. */
export function PageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[var(--layout-max-width)] px-[var(--spacing-page-x)] lg:px-[var(--spacing-page-x-lg)] ${className}`}
    >
      {children}
    </div>
  )
}
