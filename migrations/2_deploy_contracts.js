// const BN = require('bn.js');
const BeToken = artifacts.require("BeToken");
const DaiToken = artifacts.require("DaiToken");
const TokenFarm = artifacts.require("TokenFarm");

module.exports = async function(deployer, network, accounts) {
    // Deploy Mock DAI Token
    await deployer.deploy(DaiToken)
    const daiToken = await DaiToken.deployed()

    // Deploy Dapp Token
    await deployer.deploy(BeToken)
    const beToken = await BeToken.deployed()

    // Deploy TokenFarm
    await deployer.deploy(TokenFarm, beToken.address, daiToken.address)
    const tokenFarm = await TokenFarm.deployed()

    // Transfer all tokens to TokenFarm (1 millon)
    await beToken.transfer(tokenFarm.address, '1000000000000000000000000') // 1 millon tokens
    
    // Transfer 100 Mock DAI tokens to investor
    await daiToken.transfer(accounts[1], '100000000000000000000') // 100 tokens

};
