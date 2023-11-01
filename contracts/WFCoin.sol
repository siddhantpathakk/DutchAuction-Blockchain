// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

//import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

contract WFCoin is ERC20 {
    constructor(uint256 initialSupply) ERC20("Waifu", "WFC") {
        _mint(address(this), initialSupply * (10 ** uint256(decimals())));
    }

    function transfer(
        address to,
        uint amount
    ) public virtual override returns (bool) {
        _transfer(address(this), to, amount);
        return true;
    }
}
