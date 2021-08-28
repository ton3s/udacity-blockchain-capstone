pragma solidity >=0.4.21 <0.6.0;
pragma experimental ABIEncoderV2;

import "./ERC721Mintable.sol";
import "./verifier.sol";

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
contract SquareVerifier is Verifier {}

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is CustomERC721Token {

  SquareVerifier squareVerifier;

  constructor(address verifierContract) public {
    squareVerifier = SquareVerifier(verifierContract);
  }

  // TODO define a solutions struct that can hold an index & an address
  struct Solution {
    address to;
    uint256 tokenId;
  }

  // TODO define an array of the above struct
  Solution[] solutionsArray;

  // TODO define a mapping to store unique solutions submitted
  mapping(bytes32 => Solution) solutionsMapping;

  // TODO Create an event to emit when a solution is added
  event SolutionAdded(address to, uint256 tokenId);

  // TODO Create a function to add the solutions to the array and emit the event
  function addSolution(address to, uint256 tokenId, bytes32 key) public {
    Solution memory solution = Solution({ to: to, tokenId: tokenId });

    // Add solution to the data structures
    solutionsArray.push(solution);
    solutionsMapping[key] = solution;

    // Emit the event
    emit SolutionAdded(solution.to, solution.tokenId);
  }

  // TODO Create a function to mint new NFT only after the solution has been verified
  //  - make sure the solution is unique (has not been used before)
  //  - make sure you handle metadata as well as tokenSupply
  function mintNFT(address to, uint256 tokenId, SquareVerifier.Proof memory proof, uint[2] memory input) public {
    
    // Generate hash to be used as the key
    bytes32 key = keccak256(abi.encodePacked(to, tokenId, input));

    // Check that key has not been used before
    require(solutionsMapping[key].to == address(0), "Solution is not unique");

    // Verify the proof provided
    require(squareVerifier.verifyTx(proof, input), "Solution verification failed.");    

    // Add solution
    
    addSolution(to, tokenId, key);
    super.mint(to, tokenId);
  }

}

