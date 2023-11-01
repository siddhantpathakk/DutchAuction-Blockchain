const { network } = require("hardhat");
const {verify} = require("../utils/verify");

module.exports = async ({getNamedAccounts, deployments}) => {
    const {deploy, log} = deployments;
    const {deployer} = await getNamedAccounts();
    const chainId = network.config.chainId;

    const WFCoin = await deployments.get("WFCoin");

    const args = [(10**15-10**14)/(20*60),10**15,WFCoin.address];
    log(args)
    const dutchAuction = await deploy("DutchAuction", {
        contract:'DutchAuction',
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

module.exports.tags = ["all", "dutchAuction"];