import type { ChainId, Collection, CollectionStats, NftAsset, Transfer } from "../types/nft.js";

const IMAGE = "https://placehold.co/600x600/png?text=NFT";

export function demoNft(chain: ChainId, contract: string, tokenId: string): NftAsset {
  return {
    chain,
    contract,
    tokenId,
    standard: chain === "tron" ? "TRC721" : "ERC721",
    name: `Sample #${tokenId}`,
    description: `Demo metadata for ${chain} token ${tokenId}. Replace adapters with live RPC/indexer calls.`,
    image: IMAGE,
    owner: chain === "tron" ? "TXYZopYRdj2D9XRtbG411XZZ3kM5VkAeBf" : "0x000000000000000000000000000000000000dEaD",
    attributes: [
      { trait_type: "Chain", value: chain },
      { trait_type: "Edition", value: Number(tokenId) % 100 },
    ],
  };
}

export function demoCollection(chain: ChainId, contract: string): Collection {
  return {
    chain,
    contract,
    name: chain === "tron" ? "TRON Collectibles" : "Genesis Collection",
    symbol: chain === "tron" ? "TRC" : "GEN",
    standard: chain === "tron" ? "TRC721" : "ERC721",
    totalSupply: 10_000,
  };
}

export function demoTransfers(chain: ChainId, tokenId: string, count = 8): Transfer[] {
  return Array.from({ length: count }, (_, i) => ({
    chain,
    txHash: chain === "tron" ? `tron-tx-${tokenId}-${i}` : `0x${(i + 1).toString(16).padStart(64, "0")}`,
    from: i === count - 1 ? "0x0000000000000000000000000000000000000000" : `0x${(i + 10).toString(16).padStart(40, "0")}`,
    to: `0x${(i + 11).toString(16).padStart(40, "0")}`,
    tokenId,
    timestamp: Date.now() - i * 86_400_000,
  }));
}

export function demoStats(chain: ChainId, contract: string): CollectionStats {
  return {
    chain,
    contract,
    floorPrice: 0.42,
    volume24h: 128.5,
    owners: 2140,
    listed: 310,
  };
}
