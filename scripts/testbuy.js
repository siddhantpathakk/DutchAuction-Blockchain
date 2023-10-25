const hre = require("hardhat");

async function main() {
  const tokenContract = await ethers.deployContract("WFCoin", [10**10])
  await tokenContract.waitForDeployment()
  const contract = await ethers.deployContract("DutchAuction",[1,10,tokenContract.target])
  await contract.waitForDeployment()
  //await setTimeout(()=>{},5000)
  const [owner,addr1,addr2] = await ethers.getSigners();

    provider = ethers.provider;
    console.log(await provider.getBalance(addr1.address))

  const output = await contract.getPrice()
//   await addr1.sendTransaction({
//     to:contract.address,
//     value: hre.ethers.parseEther("1.0")
//   })
  const buy1 = await contract.buy({value:hre.ethers.parseEther("10.0")})
  console.log(await tokenContract.balanceOf(owner.address))
  console.log(output)
  //console.log(buy1)


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
