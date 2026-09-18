import { Router } from "express";
import { z } from "zod";
import { CHAINS, isChainId } from "../config.js";
import { BadRequestError } from "../lib/errors.js";
import { nftService } from "../services/nft-service.js";

const router = Router();

const chainParam = z.string().refine(isChainId, "unsupported chain");

function chain(value: string) {
  const parsed = chainParam.safeParse(value);
  if (!parsed.success) throw new BadRequestError("Unsupported chain");
  return parsed.data;
}

router.get("/chains", (_req, res) => {
  res.json({ chains: Object.values(CHAINS) });
});

router.get("/nfts/:chain/:contract/:tokenId", async (req, res, next) => {
  try {
    const data = await nftService.getNft(
      chain(req.params.chain),
      req.params.contract,
      req.params.tokenId
    );
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/collections/:chain/:contract", async (req, res, next) => {
  try {
    const data = await nftService.getCollection(chain(req.params.chain), req.params.contract);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/wallets/:chain/:address/nfts", async (req, res, next) => {
  try {
    const data = await nftService.getWalletNfts(chain(req.params.chain), req.params.address, req.query);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/nfts/:chain/:contract/:tokenId/transfers", async (req, res, next) => {
  try {
    const data = await nftService.getTransfers(
      chain(req.params.chain),
      req.params.contract,
      req.params.tokenId,
      req.query
    );
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/collections/:chain/:contract/stats", async (req, res, next) => {
  try {
    const data = await nftService.getStats(chain(req.params.chain), req.params.contract);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
