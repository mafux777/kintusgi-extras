import { V1Junction_AccountId32, V1Junction_AccountKey20 } from "./types/v11";
import { Store, SubstrateProcessor } from "@subsquid/substrate-processor";
import assert from "assert";
import {
  XTokensTransferredMultiAssetsEvent,
  XTokensTransferredMultiAssetWithFeeEvent,
  XTokensTransferredMultiCurrenciesEvent,
  XTokensTransferredWithFeeEvent,
  TokensTransferEvent
} from "./types/events";
import { Account, Height, Token, Transfer } from "./model";
import { CurrencyId_Token as CurrencyId_TokenV6 } from "./types/v6";
import { CurrencyId_Token as CurrencyId_TokenV15 } from "./types/v15";
import { CurrencyId_Token as CurrencyId_TokenV17 } from "./types/v17";
import * as ss58 from "@subsquid/ss58";
import { LessThanOrEqual } from "typeorm";
import { debug } from "util";
import {EventHandlerContext} from "@subsquid/substrate-processor"

require("dotenv").config()

import * as util from "@polkadot/util-crypto"
import {EventContext} from "./types/support";

const prefixes = {
  polkadot: 0,
  kusama: 2,
  plasm: 5,
  bifrost: 6,
  edgeware: 7,
  karura: 8,
  reynolds: 9,
  acala: 10,
  laminar: 11,
  substratee: 13,
  kulupu: 16,
  darwinia: 18,
  robonomics: 32,
  centrifuge: 36,
  substrate: 42,
  chainx: 44
};


const processor = new SubstrateProcessor(
  "kintsugi"
);

// workaround -- this should come out of .env but did not work
const archive = "https://api-kusama.interlay.io/gateway-graphql/v1/graphql"
const chain = "wss://api-kusama.interlay.io/parachain";

processor.setDataSource({ archive, chain });
processor.setTypesBundle("indexer/typesBundle.json");

const processFrom = Number(process.env.PROCESS_FROM) || 0;
processor.setBlockRange({ from: processFrom });


// export const currencyId = {
//   token: {
//     encode(token: CurrencyId_TokenV6 | CurrencyId_TokenV15) {
//       if (token.value.__kind === "INTERBTC") {
//         token = {
//           ...token,
//           value: {
//             __kind: "INTR"
//           }
//         };
//       }
//       return Token[(token as CurrencyId_TokenV15).value.__kind];
//     },
//   },
// };


const create_multi_account = async function (id: Uint8Array, ctx: EventHandlerContext): Promise<Account> {
  const accId = ss58.codec("kintsugi").encode(id);
  const acc = await getOrCreate(ctx.store, Account, accId);
  acc['kintsugi'] = accId
  acc['karura'] = ss58.codec("karura").encode(id);
  acc['kusama'] = ss58.codec("kusama").encode(id);
  acc['moonriver'] = '0x' + Buffer.from(util.addressToEvm(util.encodeAddress(id))).toString('hex');
  return await ctx.store.save(acc);
}

const toFloat = function(b: bigint, digits: number): number {
  const myString = b.toString()
  const myLen = myString.length
  if (myLen > 6){
    const short = myString.substring(0, myLen-6);
    const myNumber = parseFloat(short) / (10** (digits-6))
    return myNumber;
  }
  else {
    return(0);
  }
}

processor.addEventHandler("tokens.Transfer", async (ctx) => {
  const rawEvent = new TokensTransferEvent(ctx);
  let e;
  if(rawEvent.isV10) {
    e = rawEvent.asV10;
  }
  else if(rawEvent.isV15) {
    e = rawEvent.asV15;
  }
  else if(rawEvent.isV17) {
    e = rawEvent.asV17;
  }
  else {
    console.log("Not the right event version?");
    return
  }

  const height = await blockToHeight(ctx.store, ctx.block.height, "RequestIssue");

  const fromAcc = await create_multi_account(e.from, ctx)
  const toAcc = await create_multi_account(e.to, ctx)

  const id = `${ctx.event.id}-transfer`;
  const myTransfer = await getOrCreate(ctx.store, Transfer, id) as Transfer;
  myTransfer.from = fromAcc;
  myTransfer.fromChain = 2092;
  myTransfer.to = toAcc;
  myTransfer.toChain = 2092;
  myTransfer.height = height;
  myTransfer.timestamp = new Date(ctx.block.timestamp);
  // @ts-ignore
  myTransfer.token = Token[e.currencyId.value.__kind]
  myTransfer.amount = e.amount
  let short : number;
  if (myTransfer.token in ['BTC', 'KBTC']){
    short = toFloat(e.amount, 6)
  }
  else {
    short = toFloat(e.amount, 12)
  }
  myTransfer.id = id;
  await ctx.store.save(myTransfer);



  console.log(`${fromAcc.id} -> ${toAcc.id}: ${short} ${myTransfer.token}`)
});


processor.addEventHandler("xTokens.TransferredMultiCurrencies", async (ctx) => {
  const rawEvent = new XTokensTransferredMultiCurrenciesEvent(ctx);
  let e;
  if(rawEvent.isV10) {
    e = rawEvent.asV10;
  }
  else {
    console.log("Not the right event version?");
    return
  }
  const height = await blockToHeight(ctx.store, ctx.block.height, "xTokens.TransferredMultiCurrencies");
});

processor.addEventHandler("xTokens.TransferredWithFee", async (ctx) => {
  const rawEvent = new XTokensTransferredWithFeeEvent(ctx);
  let e;
  if(rawEvent.isV10) {
    e = rawEvent.asV10;
  }
  else {
    console.log("Not the right event version?");
    return
  }
  const height = await blockToHeight(ctx.store, ctx.block.height, "RequestIssue");
});

processor.addEventHandler("xTokens.TransferredMultiAssetWithFee", async (ctx) => {
  const rawEvent = new XTokensTransferredMultiAssetWithFeeEvent(ctx);
  let e;
  if(rawEvent.isV10) {
    e = rawEvent.asV10;
  }
  else {
    console.log("Not the right event version?");
    return
  }
  const height = await blockToHeight(ctx.store, ctx.block.height, "RequestIssue");
});

const isToken = (object: any): object is Token => !!object &&
  object.name === 'currencyId' && !!object.value.token;

const is2Token = (object: any): object is Token => !!object &&
  object.name === 'currencies';

processor.addEventHandler("xTokens.TransferredMultiAssets", async (ctx) => {
  const rawEvent = new XTokensTransferredMultiAssetsEvent(ctx);
  let myToken : Token;
  if(ctx.extrinsic){
    if(Array.isArray(ctx.extrinsic.args))
    {
      const tokenCurrency = ctx.extrinsic.args[0]
      if(isToken(tokenCurrency)){
        // @ts-ignore
        myToken = Token[tokenCurrency.value.token];
      }
      else if (!!tokenCurrency && "name" in tokenCurrency && tokenCurrency.name==='currencies')
      {
        // @ts-ignore
        myToken = Token[tokenCurrency.value[0][0].token] // ignore the KINT bit for now
      }
      else {
        return
      }
    }
    else {
      return }
  }
  else{
    return }

  let e;
  if(rawEvent.isV10) {
    e = rawEvent.asV10;
  }
  else if(rawEvent.isV11) {
    e = rawEvent.asV11;
  }
  else {
    console.log("Not the right event version?");
    return
  }
  const height = await blockToHeight(ctx.store, ctx.block.height, "xTokens.TransferredMultiAssets");

  const fromAcc = await create_multi_account(e.sender, ctx)

  const id = `${ctx.event.id}-xtransfer`;
  const myTransfer = await getOrCreate(ctx.store, Transfer, id);
  myTransfer.from = fromAcc;
  myTransfer.height = height;
  myTransfer.timestamp = new Date(ctx.block.timestamp);
  myTransfer.fromChain = 2092; // i guess it's always kintsugi
  const details = e.dest.interior;
  if ("value" in details && Array.isArray(details.value)) {
    if (details.value.length === 2) {
      if (details.value[0].__kind === 'Parachain') {
        const my_parachain = details.value[0];
        const to_details = details.value[1] as V1Junction_AccountId32 | V1Junction_AccountKey20;
        // Karura
        if (to_details.__kind === 'AccountId32' && my_parachain.value === 2000) {
          myTransfer.toChain = my_parachain.value;
          myTransfer.token = myToken;
          myTransfer.amount = (e.assets[0].fun.value) as bigint
          const toAccount = ss58.codec("kintsugi").encode(to_details.id);
          // we use kintsugi address as the main address and assume karura address has been saved already
          myTransfer.to = await getOrCreate(ctx.store, Account, toAccount);
          await ctx.store.save(myTransfer.to);
          console.log(`${fromAcc.id} -> ${myTransfer.to.id} ${myTransfer.token}`);
          myTransfer.id = id;
          await ctx.store.save(myTransfer);
        }
        // Moonriver
        if (to_details.__kind === 'AccountKey20' && my_parachain.value === 2023) {
          myTransfer.toChain = my_parachain.value;
          myTransfer.token = myToken;
          myTransfer.amount = (e.assets[0].fun.value) as bigint;
          const toAccount = '0x' + Buffer.from(to_details.key).toString('hex');
          const substrate = util.evmToAddress(to_details.key)
          myTransfer.to = await getOrCreate(ctx.store, Account, toAccount);
          myTransfer.to['kusama'] = 'unknown'
          await ctx.store.save(myTransfer.to);
          console.log(`${fromAcc.id} -> ${myTransfer.token}`);
          myTransfer.id = id;
          await ctx.store.save(myTransfer);
        }
      }
    }
  }
})


processor.run();

async function getOrCreate<T extends { id: string }>(
  store: Store,
  EntityConstructor: EntityConstructor<T>,
  id: string
): Promise<T> {
  let entity = await store.get<T>(EntityConstructor, {
    where: { id },
  });

  if (entity == null) {
    entity = new EntityConstructor();
    entity.id = id;
  }

  return entity;
}

type EntityConstructor<T> = {
  new (...args: any[]): T;
};

export async function blockToHeight(
  store: Store,
  absoluteBlock: number,
  eventName?: string // for logging purposes
): Promise<Height> {
  const existingBlockHeight = await store.get(Height, {
    where: { absolute: absoluteBlock },
  });
  if (existingBlockHeight !== undefined) {
    // was already set for current block, either by UpdateActiveBlock or previous invocation of blockToHeight
    return existingBlockHeight;
  } else {
    // not set for current block - get latest value of `active` and save Height for current block (if exists)
    const currentActive = (
      await store.get(Height, {
        where: { absolute: LessThanOrEqual(absoluteBlock) },
        order: { active: "DESC" },
      })
    )?.active;
    if (currentActive === undefined) {
      debug(
        `WARNING: Did not find Height entity for absolute block ${absoluteBlock}. This means the chain did not generate UpdateActiveBlock events priorly, yet other events are being processed${
          eventName ? ` (such as ${eventName})` : ""
        }, which may not be normal.`
      );
    }
    const height = new Height({
      id: absoluteBlock.toString(),
      absolute: absoluteBlock,
      active: currentActive || 0,
    });
    await store.save(height);
    return height;
  }
}

