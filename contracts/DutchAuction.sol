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
    uint public finalPrice;
    address immutable tokenContractAddress;
    mapping(address => uint) private auctionStake;
    uint private totalStake = 0;
    WFCoin wfcoin;
    bool internal locked;
    bool public AuctionFinished;

    modifier lock() {
        require(!locked, "Reentry detected");
        locked = true;
        _;
        locked = false;
    }

    constructor(uint _discountRate, uint _startPrice, address _token) {
        expirationTime = block.timestamp + auctionDuration;
        startTime = block.timestamp;
        discountRate = _discountRate;
        startPrice = _startPrice;
        owner = payable(msg.sender);
        tokenContractAddress = _token;
        wfcoin = WFCoin(_token);
        AuctionFinished = false;
    }

    function getPrice() public view returns (uint) {
        if (AuctionFinished) {
            return finalPrice;
        }
        uint elapsedTime = block.timestamp - startTime;
        if (elapsedTime > auctionDuration) {
            elapsedTime = auctionDuration;
        }
        uint discount = discountRate * elapsedTime;
        return startPrice - discount;
    }

    function refund(uint amount, address addr) public payable {
        _refund(amount, addr);
    }

    function _refund(uint amount, address addr) internal {
        payable(addr).transfer(amount);
    }

    function buy() public payable returns (uint) {
        AuctionFinished = auctionFinished();
        require(getTokenBalance() > 0, "TOKENS SOLD OUT");
        require(block.timestamp < expirationTime, "AUCTION TIME HAS ELAPSED");
        uint price = getPrice();
        require(msg.value >= price, "NOT ENOUGH ETH");
        if (msg.value + totalStake > price * 1000) {
            finalPrice = price;
            AuctionFinished = true;
            uint difference = msg.value + totalStake - finalPrice * 1000;
            console.log("difference", difference / 10 ** 14);
            totalStake += msg.value - difference;
            auctionStake[msg.sender] += msg.value - difference;
            refund(difference, msg.sender);
            return difference;
        }
        auctionStake[msg.sender] += msg.value;
        totalStake += msg.value;
        return msg.value;
    }

    function claim() public returns (uint) {
        AuctionFinished = auctionFinished();
        require(AuctionFinished, "AUCTION IS STILL IN PROGRESS");
        console.log("current price", finalPrice);
        console.log("stake:", auctionStake[msg.sender]);
        uint tokenBits = (auctionStake[msg.sender] * 10 ** 18) / finalPrice;
        require(tokenBits > 0, "You have no more tokens left to collect");
        console.log("tokens claimed", tokenBits / 10 ** 18, msg.sender);
        wfcoin.transfer(msg.sender, tokenBits);
        auctionStake[msg.sender] = 0;
        return tokenBits;
    }

    function getTokenBalance() public view returns (uint) {
        int balance = 1000 - int(totalStake / getPrice());
        console.log("balance");
        console.logInt(balance);
        return 1000 - (totalStake / getPrice());
    }

    function auctionFinished() public returns (bool) {
        if (AuctionFinished) return true;
        if (totalStake >= getPrice() * 1000) {
            finalPrice = totalStake / 1000;
            console.log("block timestamp", block.timestamp);
            console.log("expiration time", expirationTime);
            console.log("Setting Auction status to finished");
            console.log("final price: ", finalPrice);
            AuctionFinished = true;
            return true;
        }
        if (block.timestamp >= expirationTime) {
            console.log("block timestamp", block.timestamp);
            console.log("expiration time", expirationTime);
            console.log("Setting Auction status to finished");
            AuctionFinished = true;
            finalPrice = reservedPrice;
            wfcoin.burn(
                address(tokenContractAddress),
                getTokenBalance() * 10 ** 18
            );
            return true;
        }
        return false;
    }

    // receive() external payable {
    //     console.log("receive");
    // }

    // fallback() external {
    //     console.log("fallback");
    // }
}
