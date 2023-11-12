# BlockChain Project

This project implements a DutchAuction selling ERC20 coins

[Watch The Demo On Youtube](https://youtu.be/0-PKlJwvao4)

To get started, clone this repo and open command shell in the root of the project.

First, get all the packages needed using<br>
`yarn install`
or
`npm install`<br>
**Note**: using yarn is recommended as npm may give errors while getting the dependency tree

---

Once all the packages have been added, you can use hardhat to run test:
`yarn hardhat test`
The test include testing for re-entrancy attacks

To start an auction and use the front-end, open a browser that has the metamask extension.
**Note**: You will NOT be able to interact with hardhat if you do not have a metamask account.

---

Open another command shell and change directory to the front end
from the root:<br>
`cd .\front-end\dutch-auction`

Then start the react app with:<br>
`yarn start`

Next you need to start the Auction using the shell open in the root of the project:<br>
`yarn hardhat node`

<br>

Ensure that your metamask is connected to the hardhat chain and import an account from hardhat to test the Auction.
To do this, you can import using private key in metamask. The key will be displayed in the shell after running the command above.
