import type { SyntheticEvent } from 'react'

declare global {
  interface Window {
    etsAL: {
      trackClick: (event: { target: { dataset: unknown } }) => void
    }

    dataLayer: Array<unknown>
  }
}
