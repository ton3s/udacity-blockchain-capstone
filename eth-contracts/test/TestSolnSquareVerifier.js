const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const SquareVerifier = artifacts.require('SquareVerifier');
const truffleAssert = require('truffle-assertions')
const proof = require('../../zokrates/code/square/proof.json');

contract('SolnSquareVerifier', accounts => {

  beforeEach(async function () { 
    const squareVerifier = await SquareVerifier.new();
    this.contract = await SolnSquareVerifier.new(squareVerifier.address, { from: accounts[0] });
  });

  // Test if a new solution can be added for contract - SolnSquareVerifier
  it('Test if a new solution can be added for contract', async function () {
    const key = "0x7465737400000000000000000000000000000000000000000000000000000000";
    const txReceipt = await this.contract.addSolution(accounts[0], 1, key, { from: accounts[0] })
    truffleAssert.eventEmitted(txReceipt, 'SolutionAdded');
  })

  // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
  it('Test if an ERC721 token can be minted for contract', async function () {
    const txReceipt = await this.contract.mintNFT(accounts[0], 2, proof.proof, proof.inputs, { from: accounts[0] })
    truffleAssert.eventEmitted(txReceipt, 'SolutionAdded');
    truffleAssert.eventEmitted(txReceipt, 'Transfer');
  })
})





