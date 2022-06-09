export interface dayOptions {
  eventsCount: number
  date: string
  dayOfYear: number
  monthWeekday: number
  style: string
}

type RGB = `rgb(${number}, ${number}, ${number})`
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`
type HEX = `#${string}`

export type colorType = RGB | RGBA | HEX
