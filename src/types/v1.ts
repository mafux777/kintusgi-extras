import type {Result} from './support'

export type CurrencyId = CurrencyId_DOT | CurrencyId_INTERBTC | CurrencyId_INTR | CurrencyId_KSM | CurrencyId_KBTC | CurrencyId_KINT

export interface CurrencyId_DOT {
  __kind: 'DOT'
}

export interface CurrencyId_INTERBTC {
  __kind: 'INTERBTC'
}

export interface CurrencyId_INTR {
  __kind: 'INTR'
}

export interface CurrencyId_KSM {
  __kind: 'KSM'
}

export interface CurrencyId_KBTC {
  __kind: 'KBTC'
}

export interface CurrencyId_KINT {
  __kind: 'KINT'
}
