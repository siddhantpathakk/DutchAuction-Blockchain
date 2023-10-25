// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "hardhat/console.sol";
import "./WFCoin.sol";

contract DutchAuction {
    uint public constant auctionDuration = 20 minutes;
    address payable public immutable owner;
    uint public immutable expirationTime;
    uint public immutable startTime;
    uint public constant reservedPrice = 1;
    uint public immutable discountRate;
    uint public immutable startPrice;
    address immutable tokenContractAddress;
    WFCoin wfcoin;

    constructor(uint _discountRate, uint _startPrice, address _token) {
        expirationTime = block.timestamp + auctionDuration;
        startTime = block.timestamp;
        discountRate = _discountRate;
        startPrice = _startPrice;
        owner = payable(msg.sender);
        tokenContractAddress = _token;
        wfcoin = WFCoin(_token);
    }

    function getPrice() public view returns (uint) {
        uint elapsedTime = block.timestamp - startTime;
        console.log("-----", startTime, block.timestamp, elapsedTime);
        uint discount = discountRate * elapsedTime;
        return startPrice;
    }

    function buy() external payable {
        require(block.timestamp < expirationTime, "Auction time has elapsed");
        uint price = getPrice();
        require(msg.value >= price, "Not enough eth");
        console.log("msg.value", msg.value);
        uint tokens = msg.value / price;
        console.log("tokens purchased", tokens);
        uint refund = msg.value - (msg.value % price);
        uint balance = wfcoin.balanceOf(owner);

        if (tokens > balance) {
            wfcoin.transfer(msg.sender, balance);
            //payable(msg.sender).transfer(msg.value - balance * price);
        } else {
            wfcoin.transfer(msg.sender, tokens);
            //payable(msg.sender).transfer(refund);
        }
    }

    function getTokenBalance() public view returns (uint256) {
        return wfcoin.balanceOf(tokenContractAddress);
    }
}
