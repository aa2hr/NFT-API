# NFT-API

Multi-chain REST API for listing, inspecting, and analyzing NFTs across Ethereum, Polygon, BSC, and TRON.

Built as a TypeScript service with Express, Zod validation, and a pluggable chain adapter layer. Designed so new chains can be added without touching route handlers.

## Features

- Unified NFT resource model across EVM chains and TRON
- Collection + token lookup by contract / token id
- Wallet inventory endpoint
- Transfer history with pagination
- Simple floor / volume analytics (adapter-backed)
- Health and chain-status probes
- Request validation with Zod
- In-memory cache with TTL (swap-ready for Redis)

## Quick start

```bash
cp .env.example .env
npm install
npm run dev
```

Server listens on `http://localhost:8080`.

```bash
curl http://localhost:8080/health
curl http://localhost:8080/v1/chains
curl "http://localhost:8080/v1/nfts/ethereum/0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D/1"
```

## API

| Method | Path | Description |
| --- | --- | --- |
| GET | `/health` | Process health |
| GET | `/v1/chains` | Supported networks |
| GET | `/v1/nfts/:chain/:contract/:tokenId` | Single NFT + metadata |
| GET | `/v1/collections/:chain/:contract` | Collection summary |
| GET | `/v1/wallets/:chain/:address/nfts` | Wallet inventory |
| GET | `/v1/nfts/:chain/:contract/:tokenId/transfers` | Transfer history |
| GET | `/v1/collections/:chain/:contract/stats` | Floor / volume stats |

Query params for list endpoints: `limit` (1-100, default 20), `cursor`.

## Architecture

```
src/
  index.ts                 HTTP bootstrap
  app.ts                   Express app + middleware
  config.ts                Env + chain registry
  routes/                  Versioned HTTP routes
  services/                Domain services
  adapters/                Per-chain data sources
  types/                   Shared types
  lib/                     cache, errors, pagination
```

Adapters implement `ChainAdapter`. EVM adapters share a common JSON-RPC + metadata path. The TRON adapter uses TronGrid-style HTTP.

Without live RPC keys the adapters return structured demo data so the API stays runnable for local review.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Watch mode |
| `npm run build` | Compile to `dist/` |
| `npm start` | Run compiled server |
| `npm test` | Unit tests |

## Environment

See `.env.example`. Optional RPC URLs:

- `ETH_RPC_URL`
- `POLYGON_RPC_URL`
- `BSC_RPC_URL`
- `TRON_API_URL` / `TRON_API_KEY`

## License

MIT
