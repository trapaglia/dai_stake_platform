pragma solidity ^0.5.16;

import "./BeToken.sol";
import "./DaiToken.sol";

contract TokenFarm{
    string public name = "Be Token Farm";
    address public owner;
    BeToken public beToken;
    DaiToken public daiToken;

    address[] public stakers;
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor (BeToken _beToken, DaiToken _daiToken) public {
        beToken = _beToken;
        daiToken = _daiToken;
        owner = msg.sender;
    }

    function stakeTokens(uint _amount) public {
        
        // Require amount greater than 0
        require(_amount>0, 'amount cannot be 0');

        // Transfer Mock Dai tokens to this contract for staking
        daiToken.transferFrom(msg.sender, address(this), _amount);

        // Update staking balance
        stakingBalance[msg.sender] += _amount;

        // Add user to stakers array *only* if they haven't staked already
        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    function issueTokens() public {
        // Only owner can call this function
        require(msg.sender == owner, 'caller must be the owner');

        // Issue tokens to all stakers
        for (uint i=0; i<stakers.length; i++) {
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient];
            if (balance!=0) {
                beToken.transfer(recipient, balance);
            }
        }
    }

    function unstakeTokens() public {
        
        // Fetch staking balance
        uint balance = stakingBalance[msg.sender];

        // Require amount greater than 0
        require(balance > 0, 'staking balance cannot be 0');

        // Transfer Mock Dai tokens to this contract for staking
        daiToken.transfer(msg.sender, balance);

        // Reset staking balance
        stakingBalance[msg.sender] = 0;

        // Update staking status
        isStaking[msg.sender] = false;

    }

}
