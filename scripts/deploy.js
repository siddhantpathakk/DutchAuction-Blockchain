// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const tokenContract = await ethers.deployContract("WFCoin", [1**4])
  await tokenContract.waitForDeployment()
  const contract = await ethers.deployContract("DutchAuction",[1,10**15,tokenContract.target])
  await contract.waitForDeployment()
  //await setTimeout(()=>{},5000)
  provider = hre.ethers.provider
  const [owner,addr1,addr2] = await ethers.getSigners();
  const output = await contract.getPrice()
  console.log("Token balance", await contract.getTokenBalance())
  const buy1 = await contract.buy({value:hre.ethers.parseEther("0.1")})
  
  //console.log(await tokenContract.balanceOf(owner.address))
  console.log("Price", output)
  console.log("Token balance", await contract.getTokenBalance())

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
