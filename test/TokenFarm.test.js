const BeToken = artifacts.require('BeToken')
const DaiToken = artifacts.require('DaiToken')
const TokenFarm = artifacts.require('TokenFarm')

require('chai')
    .use(require('chai-as-promised'))
    .should()

function tokens(n) {
    return web3.utils.toWei(n, 'ether');
}

contract('TokenFarm', ([owner, investor]) => {
    let daiToken, beToken, tokenFarm

    before(async () => {
        // Load contracts
        daiToken = await DaiToken.new()
        beToken = await BeToken.new()
        tokenFarm = await TokenFarm.new(beToken.address, daiToken.address)

        // Transfer 1M BeTokens to TokenFarm
        await beToken.transfer(tokenFarm.address, tokens('1000000'))

        // Send tokens to investor
        await daiToken.transfer(investor, tokens('100'), { from: owner })
    })

    describe('Mock DAI deployment', async () => {
        it('has a name', async () => {
            let name = await daiToken.name()
            assert.equal(name, 'Mock DAI Token')
        })
    })

    describe('Be token deployment', async () => {
        it('has a name', async () => {
            let name = await beToken.name()
            assert.equal(name, 'Be Token')
        })
    })

    describe('Token Farm deployment', async () => {
        it('has a name', async () => {
            let name = await tokenFarm.name()
            assert.equal(name, 'Be Token Farm')
        })

        it('contract has tokens', async () => {
            let balance = await beToken.balanceOf(tokenFarm.address)
            assert.equal(balance.toString(), tokens('1000000'))
        })
    })

})
