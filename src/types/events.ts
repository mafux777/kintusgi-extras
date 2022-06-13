import assert from 'assert'
import {EventContext, Result, deprecateLatest} from './support'
import * as v1 from './v1'
import * as v10 from './v10'
import * as v11 from './v11'
import * as v15 from './v15'
import * as v17 from './v17'
import * as v6 from './v6'

export class TokensTransferEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'tokens.Transfer')
  }

  /**
   *  Transfer succeeded. \[currency_id, from, to, value\]
   */
  get isV1(): boolean {
    return this.ctx._chain.getEventHash('tokens.Transfer') === '687592af47ed25da7cb1782c7d3ab850f2643203e3a3d46a2f3f2413ed94da71'
  }

  /**
   *  Transfer succeeded. \[currency_id, from, to, value\]
   */
  get asV1(): [v1.CurrencyId, Uint8Array, Uint8Array, bigint] {
    assert(this.isV1)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Transfer succeeded. \[currency_id, from, to, value\]
   */
  get isV6(): boolean {
    return this.ctx._chain.getEventHash('tokens.Transfer') === 'fdaae151bb8b36a8d8ad740d8c981614f3554e661a6028bab9b8ca624adaac32'
  }

  /**
   * Transfer succeeded. \[currency_id, from, to, value\]
   */
  get asV6(): [v6.CurrencyId, v6.AccountId32, v6.AccountId32, bigint] {
    assert(this.isV6)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Transfer succeeded.
   */
  get isV10(): boolean {
    return this.ctx._chain.getEventHash('tokens.Transfer') === 'b10834d910d905da35363fe42f3bbd9db5dfbc13064a482a7c8c57bb3c9a8e68'
  }

  /**
   * Transfer succeeded.
   */
  get asV10(): {currencyId: v10.CurrencyId, from: v10.AccountId32, to: v10.AccountId32, amount: bigint} {
    assert(this.isV10)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Transfer succeeded.
   */
  get isV15(): boolean {
    return this.ctx._chain.getEventHash('tokens.Transfer') === '41417e5ccc760096c9529f3ff9dcfe27e94b23a733432b671ed451e2ff362dcc'
  }

  /**
   * Transfer succeeded.
   */
  get asV15(): {currencyId: v15.CurrencyId, from: v15.AccountId32, to: v15.AccountId32, amount: bigint} {
    assert(this.isV15)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Transfer succeeded.
   */
  get isV17(): boolean {
    return this.ctx._chain.getEventHash('tokens.Transfer') === '7e7dbd0d1749f3d1ce62a6cb731a143be6c8c24d291fdd7dc24892ff941ffe3b'
  }

  /**
   * Transfer succeeded.
   */
  get asV17(): {currencyId: v17.CurrencyId, from: v17.AccountId32, to: v17.AccountId32, amount: bigint} {
    assert(this.isV17)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV17
  }

  get asLatest(): {currencyId: v17.CurrencyId, from: v17.AccountId32, to: v17.AccountId32, amount: bigint} {
    deprecateLatest()
    return this.asV17
  }
}

export class XTokensTransferredMultiAssetWithFeeEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'xTokens.TransferredMultiAssetWithFee')
  }

  /**
   * Transferred `MultiAsset` with fee.
   */
  get isV10(): boolean {
    return this.ctx._chain.getEventHash('xTokens.TransferredMultiAssetWithFee') === 'cba4a5ec13032868bc74df82888767ea7fd34969b190ec1e6086219a80e5ee72'
  }

  /**
   * Transferred `MultiAsset` with fee.
   */
  get asV10(): {sender: v10.AccountId32, asset: v10.V1MultiAsset, fee: v10.V1MultiAsset, dest: v10.V1MultiLocation} {
    assert(this.isV10)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV10
  }

  get asLatest(): {sender: v10.AccountId32, asset: v10.V1MultiAsset, fee: v10.V1MultiAsset, dest: v10.V1MultiLocation} {
    deprecateLatest()
    return this.asV10
  }
}

export class XTokensTransferredMultiAssetsEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'xTokens.TransferredMultiAssets')
  }

  /**
   * Transferred `MultiAsset` with fee.
   */
  get isV10(): boolean {
    return this.ctx._chain.getEventHash('xTokens.TransferredMultiAssets') === 'f7bab399e6ba944b4e125eae381fe361968f8e894d499e45a921bf53ae4632d8'
  }

  /**
   * Transferred `MultiAsset` with fee.
   */
  get asV10(): {sender: v10.AccountId32, assets: v10.V1MultiAssets, dest: v10.V1MultiLocation} {
    assert(this.isV10)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Transferred `MultiAsset` with fee.
   */
  get isV11(): boolean {
    return this.ctx._chain.getEventHash('xTokens.TransferredMultiAssets') === '19a61ff727b39e06bdac9248dc278a5be6292a6af670958a6338915a3e003249'
  }

  /**
   * Transferred `MultiAsset` with fee.
   */
  get asV11(): {sender: v11.AccountId32, assets: v11.V1MultiAssets, fee: v11.V1MultiAsset, dest: v11.V1MultiLocation} {
    assert(this.isV11)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV11
  }

  get asLatest(): {sender: v11.AccountId32, assets: v11.V1MultiAssets, fee: v11.V1MultiAsset, dest: v11.V1MultiLocation} {
    deprecateLatest()
    return this.asV11
  }
}

export class XTokensTransferredMultiCurrenciesEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'xTokens.TransferredMultiCurrencies')
  }

  /**
   * Transferred `MultiAsset` with fee.
   */
  get isV10(): boolean {
    return this.ctx._chain.getEventHash('xTokens.TransferredMultiCurrencies') === '5c651358c717f2eafd979f1dfd6ce0304a8da4a8fcc6362b035e0b3f78ceb5b7'
  }

  /**
   * Transferred `MultiAsset` with fee.
   */
  get asV10(): {sender: v10.AccountId32, currencies: [v10.CurrencyId, bigint][], dest: v10.V1MultiLocation} {
    assert(this.isV10)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV10
  }

  get asLatest(): {sender: v10.AccountId32, currencies: [v10.CurrencyId, bigint][], dest: v10.V1MultiLocation} {
    deprecateLatest()
    return this.asV10
  }
}

export class XTokensTransferredWithFeeEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'xTokens.TransferredWithFee')
  }

  /**
   * Transferred with fee.
   */
  get isV10(): boolean {
    return this.ctx._chain.getEventHash('xTokens.TransferredWithFee') === '47fa9c25e9f6b216ac72d5410f695aa27693476acf05f1e675677473043706c7'
  }

  /**
   * Transferred with fee.
   */
  get asV10(): {sender: v10.AccountId32, currencyId: v10.CurrencyId, amount: bigint, fee: bigint, dest: v10.V1MultiLocation} {
    assert(this.isV10)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV10
  }

  get asLatest(): {sender: v10.AccountId32, currencyId: v10.CurrencyId, amount: bigint, fee: bigint, dest: v10.V1MultiLocation} {
    deprecateLatest()
    return this.asV10
  }
}
