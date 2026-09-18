import type {
  ChainId,
  Collection,
  CollectionStats,
  NftAsset,
  Page,
  Transfer,
} from "../types/nft.js";

export interface ChainAdapter {
  chain: ChainId;
  getNft(contract: string, tokenId: string): Promise<NftAsset | null>;
  getCollection(contract: string): Promise<Collection | null>;
  getWalletNfts(address: string, offset: number, limit: number): Promise<Page<NftAsset>>;
  getTransfers(
    contract: string,
    tokenId: string,
    offset: number,
    limit: number
  ): Promise<Page<Transfer>>;
  getStats(contract: string): Promise<CollectionStats | null>;
}
