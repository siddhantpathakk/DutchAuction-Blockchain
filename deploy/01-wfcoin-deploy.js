const { network } = require("hardhat");
const {verify} = require("../utils/verify");

module.exports = async ({getNamedAccounts, deployments}) => {
    const {deploy, log} = deployments;
    const {deployer} = await getNamedAccounts();
    const chainId = network.config.chainId;

    const args = [1000];
    log(args)
    const dutchAuction = await deploy("WFCoin", {
        contract:'WFCoin',
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1
    })

    if(!chainId === 31337 && process.env.ETHERSCAN_API_KEY){
        await verify(dutchAuction.address, args)
    }

    log("-----------------------")
}

module.exports.tags = ["all", "wfcoin"];