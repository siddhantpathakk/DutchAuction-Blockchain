// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const tokenContract = await ethers.deployContract("WFCoin", [10 ** 3]);
  await tokenContract.waitForDeployment();
  let discountRate = (10 ** 15 - 10 ** 14) / (20 * 60);
  const contract = await ethers.deployContract("DutchAuction", [
    discountRate,
    10 ** 15,
    tokenContract.target,
  ]);
  await contract.waitForDeployment();
  const [owner, address1] = await ethers.getSigners();
  const output = await contract.getPrice();

  await contract.connect(address1).buy({ value: hre.ethers.parseEther("1.0") });

  await contract.connect(owner).buy({ value: hre.ethers.parseEther("1.0") });

  await contract.connect(address1).claim();

  await contract.connect(owner).claim();

  // const buy2 = await contract.buy({value:hre.ethers.parseEther("0.1")})
  // const buy3 = await contract.buy({value:hre.ethers.parseEther("0.1")})
  // const buy4 = await contract.buy({value:hre.ethers.parseEther("0.1")})
  console.log("\n\n");
  console.log(
    "Token balance",
    await tokenContract.balanceOf(owner),
    owner.address
  );
  console.log(
    "Token balance",
    await tokenContract.balanceOf(tokenContract.target),
    tokenContract.target
  );
  console.log(
    "Token balance",
    await tokenContract.balanceOf(address1),
    address1.address
  );
}

//0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
