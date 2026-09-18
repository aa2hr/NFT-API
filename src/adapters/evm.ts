import type { ChainId, Collection, CollectionStats, NftAsset, Page, Transfer } from "../types/nft.js";
import { demoCollection, demoNft, demoStats, demoTransfers } from "./demo-data.js";
import type { ChainAdapter } from "./types.js";

export class EvmAdapter implements ChainAdapter {
  constructor(
    public chain: ChainId,
    private rpcUrl: string
  ) {}

  async getNft(contract: string, tokenId: string): Promise<NftAsset | null> {
    void this.rpcUrl;
    return demoNft(this.chain, contract, tokenId);
  }

  async getCollection(contract: string): Promise<Collection | null> {
    return demoCollection(this.chain, contract);
  }

  async getWalletNfts(address: string, offset: number, limit: number): Promise<Page<NftAsset>> {
    const all = Array.from({ length: 35 }, (_, i) =>
      demoNft(this.chain, `0x${address.slice(2, 10).padEnd(40, "0")}`, String(i + 1))
    );
    const items = all.slice(offset, offset + limit);
    const next = offset + limit < all.length ? String(offset + limit) : null;
    return { items, nextCursor: next };
  }

  async getTransfers(
    contract: string,
    tokenId: string,
    offset: number,
    limit: number
  ): Promise<Page<Transfer>> {
    void contract;
    const all = demoTransfers(this.chain, tokenId);
    const items = all.slice(offset, offset + limit);
    return {
      items,
      nextCursor: offset + limit < all.length ? String(offset + limit) : null,
    };
  }

  async getStats(contract: string): Promise<CollectionStats | null> {
    return demoStats(this.chain, contract);
  }
}
