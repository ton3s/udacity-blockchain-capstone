const CustomERC721Token = artifacts.require('CustomERC721Token');
const truffleAssert = require('truffle-assertions');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];
    const account_four = accounts[3];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await CustomERC721Token.new({from: account_one});

            // TODO: mint multiple tokens
            await this.contract.mint(account_one, 1, { from: account_one });
            await this.contract.mint(account_two, 2, { from: account_one });
            await this.contract.mint(account_two, 3, { from: account_one });
        })

        it('should return total supply', async function () { 
            const totalSupply = await this.contract.totalSupply.call();
            assert.equal(totalSupply, 3, 'Error: Total supply should be 3')
        })

        it('should get token balance', async function () { 
            const accountOneBalance = await this.contract.balanceOf.call(account_one);
            const accountTwoBalance = await this.contract.balanceOf.call(account_two);
            assert.equal(accountOneBalance, 1, 'Error: Account one should have a balance of 1');
            assert.equal(accountTwoBalance, 2, 'Error: Account two should have a balance of 2');
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            const tokenURI = await this.contract.tokenURI.call(1);
            assert.equal(tokenURI, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1", 'Error: Token URI should be "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1"');
        })

        it('should transfer token from one owner to another', async function () { 
            // Transfer token from account one to account two
            const txReceipt = await this.contract.transferFrom(account_one, account_two, 1, { from: account_one });

            // Confirm the balance of account one and account two
            const accountOneBalance = await this.contract.balanceOf.call(account_one);
            const accountTwoBalance = await this.contract.balanceOf.call(account_two);
            assert.equal(accountOneBalance, 0, 'Error: Account one should have a balance of 0');
            assert.equal(accountTwoBalance, 3, 'Error: Account two should have a balance of 3');

            // Check Transfer event was emitted
            truffleAssert.eventEmitted(txReceipt, 'Transfer')
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await CustomERC721Token.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            try {
                await this.contract.mint(account_three, 4, { from: account_three });
            }
            catch (err) {
                assert.equal(
                    err.reason,
                    'Caller is not the owner of the contract',
                    'Error: Only the contract owner can mint new tokens'
                );
            }
        })

        it('should return contract owner', async function () { 
            const contractOwner = await this.contract.owner.call()
            assert.equal(account_one, contractOwner, "Account one should be the contract owner");
        })

    });
})