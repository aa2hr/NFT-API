export type ChainId = "ethereum" | "polygon" | "bsc" | "tron";

export interface ChainInfo {
  id: ChainId;
  name: string;
  kind: "evm" | "tron";
  nativeSymbol: string;
  explorer: string;
}

export interface NftAsset {
  chain: ChainId;
  contract: string;
  tokenId: string;
  standard: "ERC721" | "ERC1155" | "TRC721";
  name: string;
  description: string;
  image: string;
  owner: string;
  attributes: Array<{ trait_type: string; value: string | number }>;
}

export interface Collection {
  chain: ChainId;
  contract: string;
  name: string;
  symbol: string;
  standard: NftAsset["standard"];
  totalSupply: number;
}

export interface Transfer {
  chain: ChainId;
  txHash: string;
  from: string;
  to: string;
  tokenId: string;
  timestamp: number;
}

export interface CollectionStats {
  chain: ChainId;
  contract: string;
  floorPrice: number | null;
  volume24h: number;
  owners: number;
  listed: number;
}

export interface Page<T> {
  items: T[];
  nextCursor: string | null;
}
