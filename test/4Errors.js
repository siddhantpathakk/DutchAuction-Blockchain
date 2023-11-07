/* This file test all the errors that could possibly happen and how they are dealt with
 */

const { expect } = require("chai");
const { time } = require("@nomicfoundation/hardhat-network-helpers");
const {
  duration,
} = require("@nomicfoundation/hardhat-network-helpers/dist/src/helpers/time");

describe("trying to buy less than 1 token", function () {
  it("the function should revert saying that the eth given is too less", async function () {
    const [owner, address1] = await ethers.getSigners();

    const WFCoin = await ethers.deployContract("WFCoin", [10 ** 3]);
    const DutchAuction = await ethers.deployContract("DutchAuction", [
      (10 ** 15 - 10 ** 14) / (20 * 60),
      10 ** 15,
      WFCoin.target,
    ]);
    await WFCoin.changeOwner(DutchAuction.target);

    await expect(
      DutchAuction.connect(owner).buy({
        value: ethers.parseEther("0.0009"),
      })
    ).to.be.revertedWith("NOT ENOUGH ETH");
  });
});

describe("trying to buy after all tokens are sold out", function () {
  it("the function should revert saying that the tokens are sold out", async function () {
    const [owner, address1] = await ethers.getSigners();

    const WFCoin = await ethers.deployContract("WFCoin", [10 ** 3]);
    const DutchAuction = await ethers.deployContract("DutchAuction", [
      (10 ** 15 - 10 ** 14) / (20 * 60),
      10 ** 15,
      WFCoin.target,
    ]);
    await WFCoin.changeOwner(DutchAuction.target);
    await DutchAuction.connect(owner).buy({
      value: ethers.parseEther("1.0"),
    });
    await expect(
      DutchAuction.connect(owner).buy({
        value: ethers.parseEther("0.1"),
      })
    ).to.be.revertedWith("TOKENS SOLD OUT");
  });
});

describe("trying to claim before Auction ends", function () {
  it("the function should revert saying that the auction hasn't ended", async function () {
    const [owner, address1] = await ethers.getSigners();

    const WFCoin = await ethers.deployContract("WFCoin", [10 ** 3]);
    const DutchAuction = await ethers.deployContract("DutchAuction", [
      (10 ** 15 - 10 ** 14) / (20 * 60),
      10 ** 15,
      WFCoin.target,
    ]);
    await WFCoin.changeOwner(DutchAuction.target);
    await DutchAuction.connect(owner).buy({
      value: ethers.parseEther("0.1"),
    });
    await expect(DutchAuction.connect(owner).claim()).to.be.revertedWith(
      "AUCTION IS STILL IN PROGRESS"
    );
  });
});

describe("trying to buy tokens after auction ends", function () {
  it("the function should revert saying that the auction has ended", async function () {
    const [owner, address1] = await ethers.getSigners();

    const WFCoin = await ethers.deployContract("WFCoin", [10 ** 3]);
    const DutchAuction = await ethers.deployContract("DutchAuction", [
      (10 ** 15 - 10 ** 14) / (20 * 60),
      10 ** 15,
      WFCoin.target,
    ]);
    await WFCoin.changeOwner(DutchAuction.target);
    await DutchAuction.connect(owner).buy({
      value: ethers.parseEther("0.01"),
    });
    await time.increase(20 * 60);
    await expect(
      DutchAuction.connect(owner).buy({ value: ethers.parseEther("0.01") })
    ).to.be.revertedWith("AUCTION TIME HAS ELAPSED");
  });
});
