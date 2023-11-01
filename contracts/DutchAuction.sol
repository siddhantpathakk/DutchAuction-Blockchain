// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

//import "hardhat/console.sol";
import "./WFCoin.sol";

contract DutchAuction {
    uint public constant auctionDuration = 20 minutes;
    address payable public immutable owner;
    uint public immutable expirationTime;
    uint public immutable startTime;
    uint public constant reservedPrice = 10 ** 14;
    uint public immutable discountRate;
    uint public immutable startPrice;
    address immutable tokenContractAddress;
    mapping(address => uint) private auctionStake;
    uint private totalStake = 0;
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
        uint discount = discountRate * elapsedTime;

        // console.log("\ndiscount:", discount);
        // console.log("elapsed time:", elapsedTime);
        // console.log("start Price:", startPrice);
        // console.log("currentPrice:", startPrice - discount);
        return startPrice - discount;
    }

    function buy() public payable returns (uint) {
        require(block.timestamp < expirationTime, "Auction time has elapsed");
        uint price = getPrice();
        require(msg.value >= price, "Not enough eth");
        auctionStake[msg.sender] = msg.value;
        totalStake += msg.value;
        uint tokens = msg.value / price;
        // console.log("tokens staked", tokens, msg.sender);
        return msg.value;
    }

    function claim() external payable returns (uint) {
        uint price = getPrice();
        uint tokens = auctionStake[msg.sender] / price;
        console.log("tokens claimed", tokens, msg.sender);
        tokens = tokens * (10 ** 18);
        uint refund = auctionStake[msg.sender] -
            (auctionStake[msg.sender] % price);
        // console.log("transferring tokens:", tokens);
        wfcoin.transfer(msg.sender, tokens);
        //payable(msg.sender).transfer(refund);
        auctionStake[msg.sender] = 0;
        return tokens;
    }
}
