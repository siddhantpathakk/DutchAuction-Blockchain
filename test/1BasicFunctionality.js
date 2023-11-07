const { expect } = require("chai");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("Token contract", function () {
  it("Deployment should assign the total supply of tokens to the contract", async function () {
    const [owner] = await ethers.getSigners();

    const WFCoin = await ethers.deployContract("WFCoin", [10 ** 3]);

    const ownerBalance = await WFCoin.balanceOf(WFCoin.target);

    expect(await WFCoin.totalSupply()).to.equal(ownerBalance);
  });
});

describe("DutchAuction Getting Price", function () {
  it("Calling the getPrice() function should give 10**15 wei", async function () {
    const [owner] = await ethers.getSigners();

    const WFCoin = await ethers.deployContract("WFCoin", [10 ** 3]);
    const DutchAuction = await ethers.deployContract("DutchAuction", [
      (10 ** 15 - 10 ** 14) / (20 * 60),
      10 ** 15,
      WFCoin.target,
    ]);

    const currentPrice = await DutchAuction.getPrice();

    expect(currentPrice).to.equal(10 ** 15);
  });
});

describe("DutchAuction Getting Token Balance", function () {
  it("Calling the getTokenBalance() function should return 1000 ", async function () {
    const [owner] = await ethers.getSigners();

    const WFCoin = await ethers.deployContract("WFCoin", [10 ** 3]);
    const DutchAuction = await ethers.deployContract("DutchAuction", [
      (10 ** 15 - 10 ** 14) / (20 * 60),
      10 ** 15,
      WFCoin.target,
    ]);

    const tokenBalance = await DutchAuction.getTokenBalance();

    expect(tokenBalance).to.equal(1000);
  });
});

describe("DutchAuction Committing eth", function () {
  it("Calling the buy() function at the start with 0.1 eth should buy 100 tokens ", async function () {
    //original token balance : 1000
    // start Price : 10**15 per token (decreases over time)
    // sending 0.1 eth at the start should buy  100 tokens
    const [owner] = await ethers.getSigners();

    const WFCoin = await ethers.deployContract("WFCoin", [10 ** 3]);
    const DutchAuction = await ethers.deployContract("DutchAuction", [
      (10 ** 15 - 10 ** 14) / (20 * 60),
      10 ** 15,
      WFCoin.target,
    ]);

    const transactionResponse = await DutchAuction.buy({
      value: ethers.parseEther("0.1"),
    });

    const currentPrice = await DutchAuction.getPrice();
    console.log(currentPrice);

    const tokenBalance = await DutchAuction.getTokenBalance();

    const expectedTokenBalance = 1000 - Number(BigInt(10 ** 17) / currentPrice);

    expect(tokenBalance).to.equal(expectedTokenBalance);
  });
});
