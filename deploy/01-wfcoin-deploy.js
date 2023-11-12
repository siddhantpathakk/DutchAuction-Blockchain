const { network } = require("hardhat");
const { verify } = require("../utils/verify");
const { initial_supply } = require("../constants");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  const args = [initial_supply];
  log(args);
  const WFcoin = await deploy("WFCoin", {
    contract: "WFCoin",
    from: deployer,
    args: args,
    log: true,
  });

  if (!chainId === 31337 && process.env.ETHERSCAN_API_KEY) {
    await verify(WFcoin.address, args);
  }

  log("-----------------------");
};

module.exports.tags = ["all", "wfcoin"];
