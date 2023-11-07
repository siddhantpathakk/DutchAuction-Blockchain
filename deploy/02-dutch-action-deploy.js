const { network } = require("hardhat");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  const WFCoin = await deployments.get("WFCoin");

  const args = [(10 ** 15 - 10 ** 14) / (20 * 60), 10 ** 15, WFCoin.address];
  console.log(args);
  const dutchAuction = await deploy("DutchAuction", {
    contract: "DutchAuction",
    from: deployer,
    args: args,
    log: true,
  });

  const [owner] = await ethers.getSigners();
  const contract = new ethers.Contract(WFCoin.address, WFCoin.abi, owner);

  await contract.changeOwner(dutchAuction.address);

  if (!chainId === 31337 && process.env.ETHERSCAN_API_KEY) {
    await verify(dutchAuction.address, args);
  }

  log("-----------------------");
};

module.exports.tags = ["all", "dutchAuction"];
