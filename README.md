# chainlink-fullstack

This repository contains the base/foundation needed to store off-chain data in a Mongo db and interact with smartcontract(s) when needed via web3.js

The example on the dashboard requests the current ethereum price from a public chainlink oracle, and listens for the fullfill event once the chainlink request has been fullfilled.

# Steps to run Client

To run the client update environment variables stored in /app/.env 

Requires an [INFURA account](https://infura.io/) and a [mongodb db](mongodb.com). Both of these services are free and quick to spin up. Ofcourse you have the option to connect to local RPC client but you will need to deploy several other Contracts locally. Also, instead of connecting to mongodb.com db you have the option to spin up a local mongo db. 

Update the following in the .env with the values from each account:
```
INFURA_MNEMONIC=
INFURA_URL=
MONGO_CONNECTION_STRING=
```

In the root directory run:
```
npm install
```
```
npm run client
```

# Steps to Deploy Contracts to Ropsten

In the root directory run:
```
npm run migrate-ropsten
```

# Dont forget
Supply LINK to your contract [LINK Ropsten faucet](https://ropsten.chain.link/)

Supply ETH to your Wallet [ETH Ropsten faucet](https://faucet.ropsten.be/)

Have MetaMask installed


