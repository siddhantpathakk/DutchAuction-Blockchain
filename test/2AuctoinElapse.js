/*       This test case starts the Auction elapse
         There are multiple test cases considered:
         1) No buys - expect to burn all tokens
         2) one buy - burn the rest - check Token Balance
         3) two or more buys - burn the rest - check the token Balances of the accounts that bought
*/

const { expect } = require("chai");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("No buy Case", function () {
  it("After the Auction elapses, all tokens should be burnt", async function () {
    const [owner] = await ethers.getSigners();

    const WFCoin = await ethers.deployContract("WFCoin", [10 ** 3]);
    const DutchAuction = await ethers.deployContract("DutchAuction", [
      (10 ** 15 - 10 ** 14) / (20 * 60),
      10 ** 15,
      WFCoin.target,
    ]);
    await WFCoin.changeOwner(DutchAuction.target);
    await time.increase(20 * 60);
    const transactionResponse = await DutchAuction.auctionFinished();

    expect(await WFCoin.totalSupply()).to.equal(0);
  });
});

describe("one buy Case", function () {
  it("After the Auction elapses, remaining tokens should be burnt and the token balance of buyer should be correct", async function () {
    const [owner] = await ethers.getSigners();

    const WFCoin = await ethers.deployContract("WFCoin", [10 ** 3]);
    const DutchAuction = await ethers.deployContract("DutchAuction", [
      (10 ** 15 - 10 ** 14) / (20 * 60),
      10 ** 15,
      WFCoin.target,
    ]);
    await WFCoin.changeOwner(DutchAuction.target);
    await DutchAuction.buy({ value: ethers.parseEther("0.1") });
    await time.increase(20 * 60);
    const transactionResponse = await DutchAuction.auctionFinished();
    const transactionResponse2 = await DutchAuction.claim();

    expect(await WFCoin.balanceOf(WFCoin.target)).to.equal(0);
    expect(await WFCoin.balanceOf(owner)).to.equal(BigInt(10 ** 21));
  });
});

describe("two buy Case", function () {
  it("After the Auction elapses, all remaining tokens should be burnt and the token balance of buyers should be correct", async function () {
    const [owner, address1] = await ethers.getSigners();

    const WFCoin = await ethers.deployContract("WFCoin", [10 ** 3]);
    const DutchAuction = await ethers.deployContract("DutchAuction", [
      (10 ** 15 - 10 ** 14) / (20 * 60),
      10 ** 15,
      WFCoin.target,
    ]);
    await WFCoin.changeOwner(DutchAuction.target);
    await DutchAuction.connect(owner).buy({ value: ethers.parseEther("0.02") });
    await time.increase(3 * 60);
    await DutchAuction.connect(address1).buy({
      value: ethers.parseEther("0.03"),
    });
    await time.increase(20 * 60);
    const transactionResponse = await DutchAuction.connect(
      owner
    ).auctionFinished();
    const transactionResponse2 = await DutchAuction.connect(owner).claim();
    const transactionResponse3 = await DutchAuction.connect(address1).claim();
    expect(await WFCoin.balanceOf(owner)).to.equal(BigInt(2 * 10 ** 20)); // this value is derived by (stake/reserved price) * token bits = (2 * 10**16 / 10**14) * 10**18
    expect(await WFCoin.balanceOf(address1)).to.equal(BigInt(3 * 10 ** 20));
    expect(await WFCoin.balanceOf(WFCoin.target)).to.equal(0); // check for burn
  });
});
