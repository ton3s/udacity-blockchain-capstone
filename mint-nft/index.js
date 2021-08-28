const SolnSquareVerifier = require('./contracts/SolnSquareVerifier.json')
const Config = require('./contracts/config.json')
const Web3 = require('web3')
const HDWalletProvider = require('truffle-hdwallet-provider')
require('dotenv').config()

// Setup Web3
const config = Config['rinkeby']
const provider = new HDWalletProvider(
  [process.env.BLOCKCHAIN_PRIVATE_KEY],
  `https://rinkeby.infura.io/v3/${process.env.INFURA_ID}`
)
const web3 = new Web3(provider)

// Smart contract
const solnSquareVerifier = new web3.eth.Contract(
	SolnSquareVerifier.abi,
	config.contractAddress
)

async function mintNFTS(proof, tokenId) {
  // Get accounts
	const accounts = await web3.eth.getAccounts()
	web3.eth.defaultAccount = accounts[0]

  // Mint NFT
  await solnSquareVerifier.methods
    .mintNFT(accounts[0], tokenId, proof.proof, proof.inputs)
    .send({ from: accounts[0], gas: config.gas })
    .catch(err => console.log(err))
}

function setupWeb3Listeners() {
	// SolutionAdded
	solnSquareVerifier.events.SolutionAdded({}, (error, event) =>
		logEvent(error, event)
	)
  solnSquareVerifier.events.Transfer({}, (error, event) =>
  logEvent(error, event)
)
}

function logEvent(error, event) {
	if (error) console.log(error)
	console.log(event.event)
  console.log(event.returnValues)
}

// setupWeb3Listeners()

// Mint 10 NFTS
for (let i = 1; i <= 10; i++) {
  const proof = require(`../zokrates/code/square/proofs/proof_${i}.json`)
  mintNFTS(proof, i)
}

