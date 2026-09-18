import { config } from "../config.js";
import type { ChainId } from "../types/nft.js";
import { EvmAdapter } from "./evm.js";
import { TronAdapter } from "./tron.js";
import type { ChainAdapter } from "./types.js";

const adapters: Record<ChainId, ChainAdapter> = {
  ethereum: new EvmAdapter("ethereum", config.rpc.ethereum),
  polygon: new EvmAdapter("polygon", config.rpc.polygon),
  bsc: new EvmAdapter("bsc", config.rpc.bsc),
  tron: new TronAdapter(config.rpc.tron, config.rpc.tronApiKey),
};

export function getAdapter(chain: ChainId): ChainAdapter {
  return adapters[chain];
}
