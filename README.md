# Udacity Blockchain Capstone

Blockchain capstone project consisting of building a decentralized housing product for Udacity's Blockchain course.

## Real Estate NFT Collection and Transactions

The collection of the real estate NFT's on OpenSea:
- https://testnets.opensea.io/collection/udacity-blockchain-capstone

The transactions for the NFT's being minted:
- https://rinkeby.etherscan.io/address/0x85c2a38b0251fbe7e5bdbb43f34212c0e32e9d3b

NFTS were purchased with this account:
- https://testnets.opensea.io/0x54e7c25c23987e3a51d7e43aa1f477849b04c156

The transactions for the NFT's being purchased:
- https://rinkeby.etherscan.io/address/0x54E7C25C23987e3a51d7e43aA1f477849b04c156

### Libraries

```
# dotenv
Used to load environment variables from a .env file

# truffle-assertions
Helper library to assist with checking for events

# truffle-hdwallet-provider
HD Wallet-enabled Web3 provider. Use it to sign transactions for addresses
```

### Versions

```
# Truffle version
v5.3.12

# Node version
v12.22.1

# web3 version
v1.2.1
```

### Contract Details

- All contract ABI's are available under `eth-contract/build/contracts`

- Contract deployment details are as follows:

```
Deploying 'Verifier'
--------------------
> transaction hash:    0x2d51d9b804b75c445b53b9dda1dee58d1da061c447e15feeb6e199b7728a5073
> contract address:    0xcC4B6a2611512cD53a9E66bB8139BB66D874D153
> account:             0x85C2A38b0251fbe7E5bDBb43f34212c0E32e9D3B

Deploying 'SolnSquareVerifier'
------------------------------
> transaction hash:    0xcc6c0138721d4cae8459a196737109bb6cf744487463a0184fa8c5fc9424b377
> contract address:    0xf6FC7Dd935F5c03a2D82c846Df112B6705E7AA50
> account:             0x85C2A38b0251fbe7E5bDBb43f34212c0E32e9D3B

```

### Setup

#### Smart Contracts

```
# Configure a .env file with the following:
INFURA_ID=<Infura-Id>
BLOCKCHAIN_PRIVATE_KEY=<Private key of the metamask wallet address>

# Compile and build the smart contracts
truffle migrate --reset
```

## Prerequisites

- Ganache is setup with at least 10 accounts

```
ganache-cli --deterministic 100000000 --accounts 10 --networkId 5777 --defaultBalanceEther 1000 --allowUnlimitedContractSize
```

## Tests

- Run the tests for the smart contract

```
cd eth-contracts
truffle test
```

- Test results

```
Contract: TestERC721Mintable
  match erc721 spec
    ✓ should return total supply
    ✓ should get token balance (41ms)
    ✓ should return token uri
    ✓ should transfer token from one owner to another (86ms)
  have ownership properties
    ✓ should fail when minting when address is not contract owner (230ms)
    ✓ should return contract owner (49ms)

Contract: SolnSquareVerifier
  ✓ Test if a new solution can be added for contract (44ms)
  ✓ Test if an ERC721 token can be minted for contract (638ms)

Contract: SquareVerifier
  ✓ Test verification with correct proof (519ms)
  ✓ Test verification with incorrect proof (548ms)


10 passing (5s)
```

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
