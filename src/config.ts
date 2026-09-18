import "dotenv/config";
import type { ChainId, ChainInfo } from "./types/nft.js";

export const config = {
  port: Number(process.env.PORT ?? 8080),
  env: process.env.NODE_ENV ?? "development",
  cacheTtlMs: Number(process.env.CACHE_TTL_MS ?? 30_000),
  rpc: {
    ethereum: process.env.ETH_RPC_URL ?? "",
    polygon: process.env.POLYGON_RPC_URL ?? "",
    bsc: process.env.BSC_RPC_URL ?? "",
    tron: process.env.TRON_API_URL ?? "https://api.trongrid.io",
    tronApiKey: process.env.TRON_API_KEY ?? "",
  },
};

export const CHAINS: Record<ChainId, ChainInfo> = {
  ethereum: {
    id: "ethereum",
    name: "Ethereum",
    kind: "evm",
    nativeSymbol: "ETH",
    explorer: "https://etherscan.io",
  },
  polygon: {
    id: "polygon",
    name: "Polygon",
    kind: "evm",
    nativeSymbol: "POL",
    explorer: "https://polygonscan.com",
  },
  bsc: {
    id: "bsc",
    name: "BNB Smart Chain",
    kind: "evm",
    nativeSymbol: "BNB",
    explorer: "https://bscscan.com",
  },
  tron: {
    id: "tron",
    name: "TRON",
    kind: "tron",
    nativeSymbol: "TRX",
    explorer: "https://tronscan.org",
  },
};

export function isChainId(value: string): value is ChainId {
  return value in CHAINS;
}
