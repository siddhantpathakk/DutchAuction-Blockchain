// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "./WFCoin.sol";

contract DutchAuction {
    uint public immutable auctionDuration = 20 minutes;
    address payable public immutable owner;
    uint public immutable expirationTime;
    uint public immutable startTime;
    uint public immutable reservedPrice = 1;
    uint public immutable discountRate;
    uint public immutable startPrice;
    WFCoin wfcoin;

    constructor(uint discountRate, uint startPrice, uint initialSupply) {
        expirationTime = block.timestamp + auctionDuration;
        startTime = block.timestamp;
        discountRate = discountRate;
        startPrice = startPrice;
        owner = payable(msg.sender);
        wfcoin = WFCoin(initialSupply);
    }

    function getPrice() public view returns (uint) {
        uint elapsedTime = startTime - block.timestamp;
        uint discount = discountRate * elapsedTime;
        return startPrice - discount;
    }

    function buy() external payable {
        require(block.timestamp < expirationTime, "Auction time has elapsed");

        uint price = getPrice();
        require(msg.value >= price, "Not enough eth");

        uint tokens = msg.value / price;
        uint refund = msg.value - (msg.value % price);

        uint balance = wfcoin.balanceOf(owner);

        if (tokens > balance) {
            wfcoin.transfer(msg.sender, balance);
            payable(msg.sender).transfer(msg.value - balance * price);
        } else {
            wfcoin.transfer(msg.sender, tokens);
            payable(msg.sender).transfer(refund);
        }
    }
}
