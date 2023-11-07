const { expect } = require("chai");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("stake a little eth and attempt reetnry attack", function () {
  it("After the claim, the attacker should not have more tokens than he staked for", async function () {
    const [owner, address1] = await ethers.getSigners();

    const WFCoin = await ethers.deployContract("WFCoin", [10 ** 3]);
    const DutchAuction = await ethers.deployContract("DutchAuction", [
      (10 ** 15 - 10 ** 14) / (20 * 60),
      10 ** 15,
      WFCoin.target,
    ]);
    const Attack = await ethers.deployContract("Attack", [DutchAuction.target]);
    await WFCoin.changeOwner(DutchAuction.target);

    await Attack.connect(owner).buy({ value: ethers.parseEther("0.01") });
    await time.increase(3 * 60);
    await DutchAuction.connect(address1).buy({
      value: ethers.parseEther("0.02"),
    });
    await time.increase(20 * 60);
    const transactionResponse = await DutchAuction.connect(
      owner
    ).auctionFinished();
    const transactionResponse2 = await Attack.connect(owner).attack();
    const tx3 = await DutchAuction.connect(address1).claim();

    expect(await WFCoin.balanceOf(Attack.target)).to.equal(BigInt(10 ** 20));
    expect(await WFCoin.balanceOf(address1)).to.equal(BigInt(2 * 10 ** 20));
    expect(await WFCoin.balanceOf(WFCoin.target)).to.equal(0); // check for burn
  });
});
