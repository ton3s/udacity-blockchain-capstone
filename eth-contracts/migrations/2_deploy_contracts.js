// migrating the appropriate contracts
const SquareVerifier = artifacts.require("./verifier.sol");
const SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
const fs = require('fs')
require('dotenv').config()

module.exports = function (deployer) {
  deployer
    .deploy(SquareVerifier)
    .then(() => {
			return deployer
				.deploy(SolnSquareVerifier, SquareVerifier.address)
        .then(() => {
					let config = {
						localhost: {
							url: 'http://localhost:8545',
              contractAddress: SolnSquareVerifier.address,
              gas: 6721975,
						},
            rinkeby: {
              url: `https://rinkeby.infura.io/v3/${process.env.INFURA_ID}`,
              contractAddress: '0xf6FC7Dd935F5c03a2D82c846Df112B6705E7AA50',
              gas: 6721975,
            }
					}

					// Helper function to setup config file and ABI to be available

					// Mint NFT 
					fs.writeFileSync(
						__dirname + '/../../mint-nft/contracts/config.json',
						JSON.stringify(config, null, '\t'),
						'utf-8'
					)
					fs.copyFileSync(
						__dirname + '/../build/contracts/SolnSquareVerifier.json',
						__dirname +
							'/../../mint-nft/contracts/SolnSquareVerifier.json'
					)
				})
    });
};

