/*This file has test cases for when the tokens are all bought out before the price can reach the reserved price */

const { expect } = require("chai");
const { time } = require("@nomicfoundation/hardhat-network-helpers");
const {
  duration,
} = require("@nomicfoundation/hardhat-network-helpers/dist/src/helpers/time");

describe("buy out all the tokens at the start", function () {
  it("After the Buy, the auction should end and all tokens given to the buyer", async function () {
    const [owner, address1] = await ethers.getSigners();

    const WFCoin = await ethers.deployContract("WFCoin", [10 ** 3]);
    const DutchAuction = await ethers.deployContract("DutchAuction", [
      (10 ** 15 - 10 ** 14) / (20 * 60),
      10 ** 15,
      WFCoin.target,
    ]);
    await WFCoin.changeOwner(DutchAuction.target);
    await DutchAuction.connect(owner).buy({ value: ethers.parseEther("1.0") });
    await time.increase(3 * 60);
    const transactionResponse = await DutchAuction.connect(
      owner
    ).auctionFinished();
    const transactionResponse2 = await DutchAuction.connect(owner).claim();
    expect(await WFCoin.balanceOf(owner)).to.equal(BigInt(1 * 10 ** 21)); // this value is derived by token supply * token bits = 10**3 * 10**18
    expect(await WFCoin.balanceOf(WFCoin.target)).to.equal(0); // check for burn
  });
});

describe("buy out all the tokens in the middle", function () {
  it("After the 2nd Buy, the auction should end and all tokens given to the buyer when they claim, ending price should also be correct", async function () {
    const [owner, address1] = await ethers.getSigners();

    const WFCoin = await ethers.deployContract("WFCoin", [10 ** 3]);
    const DutchAuction = await ethers.deployContract("DutchAuction", [
      (10 ** 15 - 10 ** 14) / (20 * 60),
      10 ** 15,
      WFCoin.target,
    ]);
    await WFCoin.changeOwner(DutchAuction.target);

    await DutchAuction.connect(owner).buy({ value: ethers.parseEther("0.1") });
    await time.increase(3 * 60);
    const tx = await DutchAuction.connect(address1).buy({
      value: ethers.parseEther("0.5"),
    });
    await time.increase(10 * 60);
    const transactionResponse = await DutchAuction.connect(
      owner
    ).auctionFinished();
    const transactionResponse2 = await DutchAuction.connect(owner).claim();
    const tx2 = await DutchAuction.connect(address1).claim();
    const finalPrice = BigInt(await DutchAuction.connect(owner).getPrice());

    const expectedFinalPrice = BigInt(6 * 10 ** 17) / BigInt(1000);
    expect(finalPrice).to.equal(expectedFinalPrice);
    expect((await WFCoin.balanceOf(owner)) / BigInt(10 ** 21 / 6)).to.equal(1); //  this value is derived from stake/finalPice  * token bits= (10**17/6*10**14) * 10**18

    // expect(
    //   (await WFCoin.balanceOf(address1)) / BigInt((5000 / 6) * 10 ** 18)
    // ).to.equal(1);

    // expect(
    //   (await ethers.provider.getBalance(DutchAuction.target)) /
    //     BigInt(0.6 * 10 ** 18)
    // ).to.equal(1);
  });
});
