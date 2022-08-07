# `NFT-Marketplace`

### Built using:
> React components and hooks for fast building dApps without running own backend

> Next JS

> Moralis

> Solidity

> Rinkeby Testnet

## Steps to re-create:
### `Required` - if you do not have a moralis server: register for free to get an application_id and server_url @ https://moralis.io/

1. Clone Repo
```
git clone https://github.com/P-Carth/NFT-mktplace-moralis.git
```
2. Navigate to directory
```
cd NFT-mktplace-moralis
```
3. Install dependencies
```
yarn install
```
4.  Rename `.env.local.example` to `.env` in the main folder and provide your appId and serverUrl from Moralis (How to start Moralis Server) Example:

```
NEXT_PUBLIC_MORALIS_APPLICATION_ID = xxxxxxxxxxxx
NEXT_PUBLIC_MORALIS_SERVER_URL = https://xxxxxx.grandmoralis.com:2053/server
```
5. Run local dev server
```
`yarn start` or `npm run dev`
```
## Pages
<h3> Explore page </h3>
<p align='left'> <img src="https://github.com/P-Carth/NFT-mktplace-moralis/blob/main/images/explore.png" width="800"> </img> </p>
<h3> My NFTs Page </h3>
<p align='left'> <img src="https://github.com/P-Carth/NFT-mktplace-moralis/blob/main/images/myNfts.png" width="800"/> </img> </p>
<h3> Market Page </h3>
<p align='left'> <img src="https://github.com/P-Carth/NFT-mktplace-moralis/blob/main/images/market.png" width="800"/> </img> </p>

## Summary
> This project was completed as the final project for UM fintech bootcamp.
> It uses react and moralis to connect a simple front-end to a solidity marketplace contract. The solidity contract only provides functionality for ERC-721 contracts, allowing `approval`, `list`, and `buy` functionality on the Rinkeby testnet. The `my nfts` page however operates for multiple chains to display any NFTs owned by the user's address.

