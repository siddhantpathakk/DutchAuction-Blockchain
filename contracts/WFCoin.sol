// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

//import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

contract WFCoin is ERC20 {
    constructor(uint256 initialSupply) ERC20("Waifu", "WFC") {
        _mint(msg.sender, initialSupply);
    }

    function balanceOf(
        address account
    ) public view virtual override returns (uint256) {
        return super.balanceOf(account);
    }

    function transfer(
        address to,
        uint256 value
    ) public virtual override returns (bool) {
        address owner = _msgSender();
        _transfer(owner, to, value);
        return true;
    }
}
