// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

contract DutchAuction {
    uint private constant auctionDuration = 20 minutes;
    uint private expirationTime;
    uint private startTime;
    uint private constant reservedPrice = 1;
    uint private startTime;

    constructor() {
        expirationTime = block.timestamp + auctionDuration;
        startTime = block.timestamp;
    }

    function getPrice() public view returns (uint) {
        uint elapsedTime = startTime - block.timestamp;
    }

    function buy() external payable {
        require(block.timestamp < expirationTime, "Auction time has elapsed");

        uint price = getPrice();
        require(msg.value >= price, "Not enough eth");
    }
}
