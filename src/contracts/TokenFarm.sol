pragma solidity ^0.5.16;

import "./BeToken.sol";
import "./DaiToken.sol";

contract TokenFarm{
    string public name = "Be Token Farm";
    BeToken public beToken;
    DaiToken public daiToken;

    constructor (BeToken _beToken, DaiToken _daiToken) public {
        beToken = _beToken;
        daiToken = _daiToken;
    }

}
