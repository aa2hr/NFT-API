import type { Collection, CollectionStats, NftAsset, Page, Transfer } from "../types/nft.js";
import { demoCollection, demoNft, demoStats, demoTransfers } from "./demo-data.js";
import type { ChainAdapter } from "./types.js";

export class TronAdapter implements ChainAdapter {
  chain = "tron" as const;

  constructor(
    private apiUrl: string,
    private apiKey: string
  ) {}

  async getNft(contract: string, tokenId: string): Promise<NftAsset | null> {
    void this.apiUrl;
    void this.apiKey;
    return demoNft(this.chain, contract, tokenId);
  }

  async getCollection(contract: string): Promise<Collection | null> {
    return demoCollection(this.chain, contract);
  }

  async getWalletNfts(address: string, offset: number, limit: number): Promise<Page<NftAsset>> {
    const all = Array.from({ length: 12 }, (_, i) =>
      demoNft(this.chain, address.slice(0, 8).padEnd(34, "X"), String(i + 1))
    );
    const items = all.slice(offset, offset + limit);
    return {
      items,
      nextCursor: offset + limit < all.length ? String(offset + limit) : null,
    };
  }

  async getTransfers(
    contract: string,
    tokenId: string,
    offset: number,
    limit: number
  ): Promise<Page<Transfer>> {
    void contract;
    const all = demoTransfers(this.chain, tokenId, 5);
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
