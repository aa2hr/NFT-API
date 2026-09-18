import { getAdapter } from "../adapters/registry.js";
import { config } from "../config.js";
import { TtlCache } from "../lib/cache.js";
import { decodeCursor, encodeCursor, parseLimit } from "../lib/pagination.js";
import { NotFoundError } from "../lib/errors.js";
import type { ChainId } from "../types/nft.js";

const cache = new TtlCache(config.cacheTtlMs);

export class NftService {
  async getNft(chain: ChainId, contract: string, tokenId: string) {
    return cache.wrap(`nft:${chain}:${contract}:${tokenId}`, async () => {
      const nft = await getAdapter(chain).getNft(contract, tokenId);
      if (!nft) throw new NotFoundError("NFT not found");
      return nft;
    });
  }

  async getCollection(chain: ChainId, contract: string) {
    return cache.wrap(`col:${chain}:${contract}`, async () => {
      const col = await getAdapter(chain).getCollection(contract);
      if (!col) throw new NotFoundError("Collection not found");
      return col;
    });
  }

  async getWalletNfts(chain: ChainId, address: string, query: { limit?: unknown; cursor?: string }) {
    const limit = parseLimit(query.limit);
    const offset = decodeCursor(query.cursor);
    const page = await getAdapter(chain).getWalletNfts(address, offset, limit);
    return {
      items: page.items,
      nextCursor: page.nextCursor ? encodeCursor(Number(page.nextCursor)) : null,
    };
  }

  async getTransfers(
    chain: ChainId,
    contract: string,
    tokenId: string,
    query: { limit?: unknown; cursor?: string }
  ) {
    const limit = parseLimit(query.limit);
    const offset = decodeCursor(query.cursor);
    const page = await getAdapter(chain).getTransfers(contract, tokenId, offset, limit);
    return {
      items: page.items,
      nextCursor: page.nextCursor ? encodeCursor(Number(page.nextCursor)) : null,
    };
  }

  async getStats(chain: ChainId, contract: string) {
    const stats = await getAdapter(chain).getStats(contract);
    if (!stats) throw new NotFoundError("Stats not available");
    return stats;
  }
}

export const nftService = new NftService();
